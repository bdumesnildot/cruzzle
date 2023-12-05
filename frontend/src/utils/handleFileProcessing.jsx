import { Trans } from "react-i18next";
import formatBytes from "./formatBytes";

function handleFileProcessing(
  fileList,
  maxSizeInKB,
  maxFiles,
  filesAttachment,
  setErrorFiles,
  setFilesAttachment
) {
  const addingFiles = [];
  const newErrorFiles = [];

  const maxId = filesAttachment.reduce((max, file) => {
    return file.id > max ? file.id : max;
  }, 0);

  for (let i = 0; i < fileList.length; i += 1) {
    const file = fileList[i];
    const fileId = maxId + i + 1;
    const fileSizeInKB = file.size / 1024;

    const fileData = {
      id: fileId,
      file,
    };

    // Check if file size exceeds the maximum allowed size
    if (fileSizeInKB > maxSizeInKB) {
      const maxSize = formatBytes(maxSizeInKB * 1024);
      const fileName = file.name;
      newErrorFiles.push({
        id: i,
        message: (
          <Trans
            i18nKey="pages.ideas.ideanew.header.fileserror"
            values={{ fileName, maxSize }}
          >
            The file <strong>{{ fileName }}</strong> exceeds the maximum allowed
            size of {{ maxSize }}!
          </Trans>
        ),
      });
    } else {
      // Check if the file already exists in the attachment list
      const fileExists = filesAttachment.some(
        (attachedFile) => attachedFile.file.name === file.name
      );
      if (fileExists) {
        const fileName = file.name;
        newErrorFiles.push({
          id: i,
          message: (
            <Trans
              i18nKey="pages.ideas.ideanew.alert.error.fileexist"
              values={{ fileName }}
            >
              The file <strong>{{ fileName }}</strong> already exists!
            </Trans>
          ),
        });
      } else {
        // Add the file to the attachment list if it meets all conditions
        addingFiles.push(fileData);
      }
    }
  }

  // Check if the maximum number of files is exceeded
  if (filesAttachment.length + addingFiles.length > maxFiles) {
    newErrorFiles.push({
      id: 9999,
      message: (
        <Trans
          i18nKey="pages.ideas.ideanew.alert.error.maxfiles"
          values={{ maxFiles }}
        >
          The following file(s) exceed(s) the maximum allowed count of{" "}
          <strong>{{ maxFiles }}</strong>!
        </Trans>
      ),
    });
  }

  if (newErrorFiles.length > 0) {
    setErrorFiles(newErrorFiles);
  } else {
    setErrorFiles([]);
    setFilesAttachment((prevFiles) => [...prevFiles, ...addingFiles]);
  }
}

export default handleFileProcessing;
