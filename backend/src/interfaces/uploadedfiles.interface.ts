interface UploadedFiles {
  url: string;
  type: "attachment" | "primaryImg";
  size?: number;
}

interface UploadedImg {
  url: string;
}

export { UploadedFiles, UploadedImg };
