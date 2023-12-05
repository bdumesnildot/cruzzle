import { useContext, useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";

import handleFileProcessing from "../../utils/handleFileProcessing";
import formatBytes from "../../utils/formatBytes";

import dragdrop from "../../assets/idea/dragdrop.svg";
import UploadButton from "../styledComponents/UploadButton";
import TableFilesUpload from "./TableFilesUpload";
import Dropzone from "../styledComponents/Dropzone";
import nodata from "../../assets/idea/nodata2.svg";

import { IdeaFormContext } from "../../contexts/IdeaFormContext";
import { AlertToastContext } from "../../contexts/AlertToastContext";

function IdeaUpload() {
  const { t } = useTranslation();
  const { filesAttachment, setFilesAttachment, setErrorFiles, errorFiles } =
    useContext(IdeaFormContext);
  const { setOpen, setMessage, setSeverity, setTitle } =
    useContext(AlertToastContext);

  useEffect(() => {
    if (errorFiles.length > 0) {
      setSeverity("error");
      setTitle(t("pages.ideas.ideanew.alert.error.title"));
      const allErrorFiles = errorFiles.map((file) => (
        <div key={file.id} className="w-full">
          {file.message}
        </div>
      ));
      setMessage(allErrorFiles);
      setOpen(true);
    }
  }, [errorFiles]);

  const [isDragActive, setIsDragActive] = useState(false);

  const columns = [
    { id: 1, label: t("pages.ideas.idea.tabsIdea.tabfiles.type") },
    { id: 2, label: t("pages.ideas.idea.tabsIdea.tabfiles.file") },
    {
      id: 3,
      label: t("pages.ideas.idea.tabsIdea.tabfiles.size"),
    },
    {
      id: 4,
      label: t("pages.ideas.idea.tabsIdea.tabfiles.action"),
    },
  ];

  const maxSizeInKB = 4096; // Maximum size file in Kb
  const maxFiles = 10; // Maximum number of files

  const handleChangeFile = (event) => {
    const { files } = event.target;
    handleFileProcessing(
      files,
      maxSizeInKB,
      maxFiles,
      filesAttachment,
      setErrorFiles,
      setFilesAttachment
    );
  };

  const handleDropFiles = (droppedFiles) => {
    handleFileProcessing(
      droppedFiles,
      maxSizeInKB,
      maxFiles,
      filesAttachment,
      setErrorFiles,
      setFilesAttachment
    );
  };

  const handleDeleteFiles = (id) => {
    const newFiles = filesAttachment.filter((file) => file.id !== id);
    setFilesAttachment(newFiles);
  };

  const nbAttachements = filesAttachment.length;

  return (
    <div className="my-8" aria-label="Upload Files">
      <h2 className="text-xl sm:text-2xl font-bold my-4">
        {t("pages.ideas.ideanew.upload.title")}
      </h2>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full flex justify-center items-center lg:mx-8">
          <Dropzone
            handleDropFiles={handleDropFiles}
            isClick
            onDragActive={setIsDragActive}
          >
            <div
              className={`w-[316px] h-[202px] flex flex-col-reverse my-6 lg:w-[456px] lg:h-[372px] lg:flex-col rounded-3xl relative justify-around items-center py-10 lg:px-10 ${
                isDragActive ? "bg-neutral-300" : "bg-neutral-200"
              }`}
            >
              <img
                src={dragdrop}
                alt="standard"
                className="w-28 select-none lg:w-auto absolute top-[-40px] right-[-20px] lg:top-[-50px] lg:right-[-50px] "
              />

              <h2 className="hidden lg:flex text-xl font-bold">
                {t("pages.ideas.ideanew.upload.drag")}
              </h2>
              <h2 className="hidden lg:flex text-xl font-normal">
                {t("pages.ideas.ideanew.upload.or")}
              </h2>
              <UploadButton
                id="uploadButton2"
                accept=".doc, .docx, .pdf, .xls, .xlsx, .txt, .png, .jpeg, .jpg, .ogg, .mp3"
                multiple
                onChange={handleChangeFile}
              >
                {t("buttons.addfiles")}
              </UploadButton>

              <div className="flex flex-col items-center">
                <h2 className="text-sm font-bold my-2">
                  {t("pages.ideas.ideanew.upload.supportedfiles")}
                </h2>
                <p className="text-xs font-normal my-2">
                  {formatBytes(maxSizeInKB * 1024)}{" "}
                  {t("pages.ideas.ideanew.upload.maxand")} {maxFiles}{" "}
                  {t("pages.ideas.ideanew.upload.filesmax")}
                </p>
                <p className="text-xs font-normal my-2">
                  doc, docx, pdf, xls, xlsx, txt, png, jpeg, jpg, ogg, mp3
                </p>
              </div>
            </div>
          </Dropzone>
        </div>

        <div className="w-full flex flex-col lg:mx-10 py-8">
          {filesAttachment.length !== 0 && (
            <>
              <p className="w-full my-4">
                <Trans
                  i18nKey="pages.ideas.ideanew.upload.numberfiles"
                  count={nbAttachements}
                >
                  Number of files : <strong>{{ nbAttachements }}</strong>
                </Trans>
              </p>
              <TableFilesUpload
                columns={columns}
                rows={filesAttachment}
                onClickDelete={handleDeleteFiles}
              />
            </>
          )}
          {filesAttachment.length === 0 && (
            <div className="h-full flex flex-col">
              <div>
                <Trans
                  i18nKey="pages.ideas.ideanew.upload.numberfiles"
                  count={nbAttachements}
                >
                  Number of files : <strong>{{ nbAttachements }}</strong>
                </Trans>
              </div>
              <img
                src={nodata}
                alt="no data"
                className="h-28 md:h-36 lg:h-52 self-center mt-2"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default IdeaUpload;
