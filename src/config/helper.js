import moment from "moment";
import CryptoJS from "crypto-js";
import { secretKey } from "./constants";
import { toast } from "react-toastify";
import html2canvas from "html2canvas-pro";


const handleDownload = ({ base64String, fileName }) => {
  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "application/octet-stream" });

  const blobUrl = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = fileName;
  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(blobUrl);
};

function groupObservationsByTitle(array) {
  const grouped = array.reduce((acc, item) => {
    const title = item.observationTitle;

    if (!acc[title]) {
      acc[title] = {
        commonTitle: title,
        observations: [],
      };
    }
    acc[title].observations.push(item);
    return acc;
  }, {});

  const result = Object.values(grouped).filter(
    (group) => group.observations.length > 1
  );

  return result;
}

function groupObservationsBySubLocationAndArea(array) {
  // Helper to normalize area (ignore case & underscores)
  const normalizeArea = (area) => area?.toLowerCase().replace(/_/g, "") || "";

  // First, group by subLocation
  const groupedBySubLocation = array.reduce((acc, item) => {
    const subLoc = item.subLocation;

    if (!acc[subLoc]) {
      acc[subLoc] = {
        subLocation: subLoc,
        areas: {},
      };
    }

    // Normalize area
    const areaKey = normalizeArea(item.area);

    if (!acc[subLoc].areas[areaKey]) {
      acc[subLoc].areas[areaKey] = {
        area: item.area,
        observations: [],
      };
    }

    // Push the observation
    acc[subLoc].areas[areaKey].observations.push(item);
    return acc;
  }, {});

  // Convert nested objects into arrays
  const result = Object.values(groupedBySubLocation).map((subLocGroup) => ({
    subLocation: subLocGroup.subLocation,
    areas: Object.values(subLocGroup.areas),
  }));

  return result;
}

const htmlToImage = async (html, width = 800) => {
  if (!html) return null;

  const div = document.createElement("div");
  div.className = "pdf-render-wrapper";
  div.style.position = "absolute";
  div.style.left = "-9999px";
  div.style.top = "0";
  div.style.width = `${width}px`;
  div.innerHTML = html;

  // force table borders
  // After injecting HTML into the div
  div.querySelectorAll("table, th, td").forEach((el) => {
    el.style.border = "1px solid black";
    el.style.borderCollapse = "collapse"; // make it look tight
    el.style.color = "black"; // in case text got styled as white
  });

  // optional: background
  div.querySelectorAll("th").forEach((el) => {
    if (!el.style.backgroundColor) {
      el.style.backgroundColor = "#f0f0f0"; // light gray header
    }
  });


  document.body.appendChild(div);

  const canvas = await html2canvas(div, { scale: 1 });
  document.body.removeChild(div);

  return canvas.toDataURL("image/png");
};

// Walk grouped observations and replace HTML with base64 images
const convertObservationsToImages = async (grouped) => {
  const result = [];

  for (const subLoc of grouped) {
    const areas = [];

    for (const area of subLoc.areas) {
      const observations = [];

      for (const obs of area.observations) {
        const imgData = await htmlToImage(obs.observationName);
        observations.push({
          ...obs,
          observationImage: imgData, // new field
        });
      }

      areas.push({ ...area, observations });
    }

    result.push({ ...subLoc, areas });
  }

  return result;
};

const convertObservationsToImagesForInternalAuditReport = async (grouped) => {
  const result = [];

  for (const areaGroup of grouped) {
    const items = [];

    for (const obs of areaGroup.items) {
      const observationImg = await htmlToImage(obs.observationName);
      const managementCommentsImg = await htmlToImage(obs.managementComments);

      items.push({
        ...obs,
        observationImage: observationImg,
        managementCommentsImage: managementCommentsImg,
      });
    }

    result.push({
      ...areaGroup,
      items,
    });
  }

  return result;
};


const convertObservationsToImagesForSummarizedReport = async (grouped) => {
  const result = [];

  for (const consolidatedItem of grouped) {
    const consolidatedObservations = [];

    for (const obs of consolidatedItem.consolidatedObservations) {
      const summaryOfKeyFindingImage = await htmlToImage(obs.summaryOfKeyFinding);

      consolidatedObservations.push({
        ...obs,
        summaryOfKeyFindingImage: summaryOfKeyFindingImage,
      });
    }

    result.push({
      ...consolidatedItem,
      consolidatedObservations,
    });
  }

  return result;
};



function handleCalculateProbability(item) {
  let num = 0;
  item?.riskFactorValues?.forEach((element) => {
    let internalNumber =
      Number(element?.value1 / 100) * Number(element?.value2);
    num = num + internalNumber;
  });
  return num.toFixed(2);
}

function handleCalculateRiskScore(item) {
  let num = 0;
  item?.riskFactorValues?.forEach((element) => {
    let internalNumber =
      (Number(element?.value1) / 100) * Number(element?.value2);
    num += internalNumber;
  });

  let result = num * (Number(item?.impact) / 100) * Number(item?.likelihood);

  return Number(result.toFixed(2));
}

function getNextYears() {
  const currentYear = moment().year();
  const yearsArray = Array.from({ length: 7 }, (_, i) =>
    (currentYear + i).toString()
  );
  return yearsArray;
}

function getYearsRange() {
  const yearsArray = [
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
    "2030",
    "2031",
  ];
  return yearsArray;
}

const encryptAndEncode = (id) => {
  const encrypted = CryptoJS.AES.encrypt(id, secretKey).toString();
  return encodeURIComponent(encrypted);
};

const decryptString = (encryptedString) => {
  if (typeof encryptedString !== "string" || encryptedString.trim() === "") {
    toast.error("Invalid input for decryption");
    return;
  }
  try {
    const decoded = decodeURIComponent(encryptedString);
    const bytes = CryptoJS.AES.decrypt(decoded, secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    if (!decrypted) toast.error("Decryption failed: invalid key");
    return decrypted;
  } catch (error) {
    toast.error("Decryption failed:", error);
    return;
  }
};

function getLastTenYears() {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 10 }, (_, index) => currentYear - index);
}

function groupByAreaAndSubject(data) {
  const groupedMap = new Map();

  data?.forEach((item) => {
    const areaKey = item?.area.trim().toLowerCase();
    const subjectKey = item?.subject.trim().toLowerCase();
    const key = `${areaKey}||${subjectKey}`;

    if (!groupedMap.has(key)) {
      groupedMap.set(key, {
        area: item?.area,
        subject: item?.subject,
        items: [],
      });
    }

    groupedMap.get(key).items.push(item);
  });

  return Array.from(groupedMap.values());
}

const cleanHtml = (htmlString) => {
  if (!htmlString) return "";

  let cleaned = htmlString;

  // Remove ALL font-family definitions (including quotes and !important)
  cleaned = cleaned.replace(/font-family\s*:\s*[^;"'}]+[;"'}]?/gi, "");

  // Force tables to have clear black borders and consistent size
  // For <td>
  cleaned = cleaned.replace(/<td(.*?)>/gi, (match, group1) => {
    if (/style=/i.test(group1)) {
      return `<td${group1.replace(
        /style=["']([^"']*)["']/i,
        (m, styles) =>
          ` style="${styles}; border:1px solid black"`
      )}>`;
    }
    return `<td${group1} style="border:1px solid black;">`;
  });

  // For <th>
  cleaned = cleaned.replace(/<th(.*?)>/gi, (match, group1) => {
    if (/style=/i.test(group1)) {
      return `<th${group1.replace(
        /style=["']([^"']*)["']/i,
        (m, styles) =>
          ` style="${styles}; border:1px solid black"`
      )}>`;
    }
    return `<th${group1} style="border:1px solid black">`;
  });

  // For <table>
  cleaned = cleaned.replace(/<table(.*?)>/gi, (match, group1) => {
    if (/style=/i.test(group1)) {
      return `<table${group1.replace(
        /style=["']([^"']*)["']/i,
        (m, styles) =>
          ` style="${styles}; border:1px solid black"`
      )}>`;
    }
    return `<table${group1} style="border:1px solid black">`;
  });


  // Force images to scale properly
  cleaned = cleaned.replace(
    /<img/gi,
    '<img style="max-width: 300px; max-height: 200px; height: auto; width: auto; display: block; margin: 0 auto;"'
  );


  return cleaned.trim();
};

const isHtmlEmpty = (html) => {
  if (!html || typeof html !== "string") return true;

  // Remove spaces, line breaks, & non-breaking spaces
  let cleaned = html.replace(/&nbsp;/gi, " ").trim();

  // Remove all <br> tags
  cleaned = cleaned.replace(/<br\s*\/?>/gi, "");

  // Remove empty <p> tags (like <p></p> or <p>   </p>)
  cleaned = cleaned.replace(/<p>\s*<\/p>/gi, "");

  // Strip all remaining tags
  const textOnly = cleaned.replace(/<[^>]*>/g, "").trim();

  // If after stripping everything, nothing is left → it's empty
  return textOnly.length === 0;
};


const groupBySubLocationAndArea = (list) => {
  const grouped = list.reduce((acc, item) => {
    const subLocation = item.subLocation ?? "__MISSING_SUBLOCATION__";
    const originalArea = item.area?.trim() || "__MISSING_AREA__";
    const normalizedArea = originalArea.toLowerCase();

    if (!acc[subLocation]) {
      acc[subLocation] = {};
    }

    if (!acc[subLocation][normalizedArea]) {
      acc[subLocation][normalizedArea] = {
        originalArea,
        items: [],
      };
    }

    acc[subLocation][normalizedArea].items.push(item);
    return acc;
  }, {});

  const result = Object.entries(grouped).map(([subLocation, areas]) => ({
    subLocation:
      subLocation === "__MISSING_SUBLOCATION__" ? null : Number(subLocation),
    areas: Object.values(areas).map(({ originalArea, items }) => ({
      area: originalArea === "__MISSING_AREA__" ? null : originalArea,
      items,
    })),
  }));

  return result;
};

const groupByArea = (list) => {
  const grouped = list.reduce((acc, item) => {
    const originalArea = item.area?.trim() || "__MISSING_AREA__";
    const normalizedArea = originalArea.toLowerCase();

    if (!acc[normalizedArea]) {
      acc[normalizedArea] = {
        originalArea,
        items: [],
      };
    }

    acc[normalizedArea].items.push(item);
    return acc;
  }, {});

  const result = Object.values(grouped).map(({ originalArea, items }) => ({
    area: originalArea === "__MISSING_AREA__" ? null : originalArea,
    items,
  }));

  return result;
};

const getStepStatusLabel = (stepNo, user) => {
  if (stepNo === 0 || stepNo === 1) return "Exceptions To Be Sent To Management For Comments";
  if (stepNo === 2) return "Awaiting Management Comments";
  if (stepNo === 3) {
    return user?.userId?.employeeid?.userHierarchy === "Management_Auditee"
      ? "Management Comments Sent"
      : "Management Comments Received";
  }
  if (stepNo >= 4) return "Exception To Be Implemented";
  return "";
};



export {
  handleDownload,
  groupObservationsByTitle,
  handleCalculateProbability,
  handleCalculateRiskScore,
  getNextYears,
  getYearsRange,
  encryptAndEncode,
  decryptString,
  getLastTenYears,
  groupByAreaAndSubject,
  cleanHtml,
  groupBySubLocationAndArea,
  groupByArea,
  groupObservationsBySubLocationAndArea,
  getStepStatusLabel,
  isHtmlEmpty,
  convertObservationsToImages,
  htmlToImage,
  convertObservationsToImagesForInternalAuditReport,
  convertObservationsToImagesForSummarizedReport
};
