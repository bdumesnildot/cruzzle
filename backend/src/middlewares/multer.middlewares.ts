import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
// Setting up multer as a middleware to grab files uploads
const upload = multer({ storage: multer.memoryStorage() });
// Files Filter
const imgFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (
    file.mimetype === "application/msword" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.mimetype === "application/pdf" ||
    file.mimetype === "application/vnd.ms-excel" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    file.mimetype === "text/plain" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "audio/ogg" ||
    file.mimetype === "audio/mpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
// Combine filters
const uploadIdea = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "primaryImg") {
      imgFilter(req, file, cb);
    } else if (file.fieldname === "attachement") {
      fileFilter(req, file, cb);
    } else {
      cb(null, false);
    }
  },
});
const uploadFilesIdea = uploadIdea.fields([
  { name: "primaryImg", maxCount: 1 },
  { name: "attachement", maxCount: 10 },
]);

// Avatar

const uploadImage = multer({
  storage: multer.memoryStorage(),
  fileFilter: imgFilter,
}).any();

export { upload, uploadFilesIdea, uploadImage };
