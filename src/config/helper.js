import moment from "moment";
import CryptoJS from "crypto-js";
import { secretKey } from "./constants";
import { toast } from "react-toastify";

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

  data.forEach((item) => {
    const areaKey = item.area.trim().toLowerCase();
    const subjectKey = item.subject.trim().toLowerCase();
    const key = `${areaKey}||${subjectKey}`;

    if (!groupedMap.has(key)) {
      groupedMap.set(key, {
        area: item.area,
        subject: item.subject,
        items: [],
      });
    }

    groupedMap.get(key).items.push(item);
  });

  return Array.from(groupedMap.values());
}

const cleanHtml = (htmlString) => {
  if (!htmlString) return "";
  return htmlString.replace(/font-family:[^;"'}]+[;"'}]/gi, "");
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

const convertToBase64 = (text) => {
  return btoa(unescape(encodeURIComponent(text)));
};

const convertFromBase64 = (value) => {
  try {
    if (
      typeof value === "string" &&
      /^[A-Za-z0-9+/=]+$/.test(value) &&
      value.length % 4 === 0
    ) {
      return decodeURIComponent(escape(atob(value)));
    }
    return value;
  } catch {
    return value
  }
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
  convertToBase64,
  convertFromBase64
};
