import { saveAs } from "file-saver";

function downloadFile(data, filename) {
  saveAs(data, filename);
}

export default downloadFile;
