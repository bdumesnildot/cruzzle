const getNameFileToFirebaseLink = (link) => {
  const decodedUrl = decodeURIComponent(link);
  const regex = /-\d+_\d+$/;

  const filenameWithTimestampAndExt = decodedUrl
    .substring(decodedUrl.lastIndexOf("/") + 1)
    .split("?")[0];

  const ext = filenameWithTimestampAndExt.split(".")[1];

  const filenameWithTimestampsWithoutExt =
    filenameWithTimestampAndExt.split(".")[0];

  const filenameWithoutExt = filenameWithTimestampsWithoutExt.split(regex)[0];

  const filename = `${filenameWithoutExt}.${ext}`;

  return filename;
};

export default getNameFileToFirebaseLink;
