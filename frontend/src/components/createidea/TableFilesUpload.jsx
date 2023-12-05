import { useTranslation } from "react-i18next";
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
import PropTypes from "prop-types";

import formatBytes from "../../utils/formatBytes";

function TableFilesUpload({ columns, rows, onClickDelete }) {
  const { t } = useTranslation();
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
            {rows.map((file) => {
              const attachment = file.file;
              return (
                <TableRow key={attachment.name}>
                  <TableCell align="center" className="h-10 w-10">
                    <FileIcon
                      extension={attachment.name.split(".")[1]}
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...defaultStyles[attachment.name.split(".")[1]]}
                    />
                  </TableCell>
                  <TableCell align="left">{attachment.name}</TableCell>
                  <TableCell align="left" className="text-xs text-gray-400">
                    {formatBytes(attachment.size)}
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      variant="outlined"
                      color="error"
                      className="rounded-full"
                      onClick={() => onClickDelete(file.id)}
                    >
                      {t("buttons.delete")}
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
export default TableFilesUpload;

TableFilesUpload.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      align: PropTypes.string,
    })
  ).isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      file: PropTypes.shape({
        name: PropTypes.string.isRequired,
        size: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
  onClickDelete: PropTypes.func.isRequired,
};
