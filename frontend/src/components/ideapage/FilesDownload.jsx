import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { FileIcon, defaultStyles } from "react-file-icon";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import getNameFileToFirebaseLink from "../../utils/getNameFileToFirebaseLink";
import { IdeaPageContext } from "../../contexts/IdeaPageContext";
import formatBytes from "../../utils/formatBytes";
import downloadFile from "../../utils/downloadfile";

function FilesDownload() {
  const { t } = useTranslation();
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
  const { idea } = useContext(IdeaPageContext);

  return (
    <Paper className="w-full overflow-y-hidden sm:overflow-hidden">
      <TableContainer className="min-w-[500px] max-h-[310px]">
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {idea.attachment &&
              idea.attachment.map((file) => {
                const filename = getNameFileToFirebaseLink(file.content_url);
                return (
                  <TableRow key={file.id}>
                    <TableCell align="center" className="h-10 w-10">
                      <FileIcon
                        extension={filename.split(".")[1]}
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...defaultStyles[filename.split(".")[1]]}
                      />
                    </TableCell>
                    <TableCell align="left">{filename}</TableCell>
                    <TableCell align="left" className="text-xs text-gray-400">
                      {formatBytes(file.size)}
                    </TableCell>
                    <TableCell align="left">
                      <Button
                        variant="outlined"
                        color="primary"
                        className="rounded-full"
                        onClick={() => downloadFile(file.content_url, filename)}
                      >
                        {t("buttons.download")}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
export default FilesDownload;
