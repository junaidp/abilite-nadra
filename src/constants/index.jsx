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

export { baseUrl, handleDownload, groupObservationsByTitle };
