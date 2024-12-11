import moment from "moment";
const baseUrl = "https://healthy-wolf-certainly.ngrok-free.app";

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

function getPreviousYears() {
  const previousYear = moment().year() - 1;
  const yearsArray = Array.from({ length: 6 }, (_, i) =>
    (previousYear - i).toString()
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

export {
  baseUrl,
  handleDownload,
  groupObservationsByTitle,
  handleCalculateProbability,
  handleCalculateRiskScore,
  getNextYears,
  getPreviousYears,
  getYearsRange,
};
