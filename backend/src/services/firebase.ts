import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
  listAll,
  getMetadata,
} from "firebase/storage";
import dayjs from "dayjs";
import config from "../config/firebase.config";
import { UploadedFiles } from "../interfaces/uploadedfiles.interface";

// Initialize a firebase application
initializeApp(config.firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();

const uploadToFirebase = async (
  files: Express.Multer.File[],
  id: number
): Promise<UploadedFiles[]> => {
  const uploadPromises = files.map(async (file) => {
    if (!Array.isArray(files)) {
      throw new Error("Invalid files parameter. Expected an array of files.");
    }
    const datetime = dayjs().format("YYYYMMDD_HHmmss");
    let storagePath = `ideas/${id}/`; // Dossier principal
    let fileType: "attachment" | "primaryImg";

    if (file.fieldname === "primaryImg") {
      storagePath += "primaryImg/"; // Dossier pour les images
      fileType = "primaryImg";
    } else {
      storagePath += "attachment/"; // Dossier pour les autres types de fichiers
      fileType = "attachment";
    }

    const ext = file.originalname.split(".")[1];
    const fileName = file.originalname
      .split(".")[0]
      .toLowerCase()
      .split(" ")
      .join("-");

    const storageRef = ref(
      storage,
      `${storagePath}${fileName}-${datetime}.${ext}`
    );

    const metadata = {
      contentType: file.mimetype,
    };

    const snapshot = await uploadBytesResumable(
      storageRef,
      file.buffer,
      metadata
    );

    const url = await getDownloadURL(snapshot.ref);

    return { url, type: fileType };
  });

  const uploadedFiles = await Promise.all(uploadPromises);

  return uploadedFiles;
};

const uploadOneFileToFirebase = async (
  file: Express.Multer.File,
  id: number
): Promise<UploadedFiles> => {
  const datetime = dayjs().format("YYYYMMDD_HHmmss");
  let storagePath = `ideas/${id}/`; // Dossier principal
  let fileType: "attachment" | "primaryImg";

  if (file.fieldname === "primaryImg") {
    storagePath += "primaryImg/"; // Dossier pour les images
    fileType = "primaryImg";
  } else {
    storagePath += "attachment/"; // Dossier pour les autres types de fichiers
    fileType = "attachment";
  }

  const ext = file.originalname.split(".")[1];
  const fileName = file.originalname
    .split(".")[0]
    .toLowerCase()
    .split(" ")
    .join("-");

  const storageRef = ref(
    storage,
    `${storagePath}${fileName}-${datetime}.${ext}`
  );

  const metadata = {
    contentType: file.mimetype,
  };

  const snapshot = await uploadBytesResumable(
    storageRef,
    file.buffer,
    metadata
  );

  const url = await getDownloadURL(snapshot.ref);

  return { url, type: fileType };
};

const isStorageFolderEmpty = async (storagePath: string) => {
  try {
    const storageRef = ref(storage, storagePath);
    const { items } = await listAll(storageRef);
    const isFolderEmpty = items.length === 0;

    return isFolderEmpty;
  } catch (error) {
    console.error("Error on isStorageFolderEmpty :", error);
    throw error;
  }
};

const deleteFilesInFolder = async (storagePath: string) => {
  try {
    const storageRef = ref(storage, storagePath);
    const listResult = await listAll(storageRef);
    const deleteFilePromises = listResult.items.map((fileRef) => {
      return deleteObject(fileRef);
    });
    await Promise.all(deleteFilePromises);

    console.info(`File in folder: ${storagePath} sucess deleted.`);
  } catch (error) {
    console.error("Error on deleteFilesInFolder :", error);
    throw error;
  }
};

const deleteOneFileInFirebase = async (
  storagePath: string,
  filename: string
) => {
  try {
    const desertRef = ref(storage, `${storagePath}${filename}`);

    await deleteObject(desertRef);
    console.info(
      `File: ${filename}, in folder: ${storagePath} sucess deleted.`
    );
  } catch (error) {
    console.error("Error on deleteOneFileInFirebase :", error);
    throw error;
  }
};

const decodeUrlFirebase = (arrayUrl: string[]) => {
  const array = [];
  for (const url of arrayUrl) {
    const decodedUrl = decodeURIComponent(url);
    array.push(
      decodedUrl.substring(decodedUrl.lastIndexOf("/") + 1).split("?")[0]
    );
  }
  return array;
};

const deleteMultipleFilesInFirebase = async (
  arrayAttachement: string[],
  route: string
) => {
  try {
    const deleteFilesPromise = [];
    const filesAttachements = decodeUrlFirebase(arrayAttachement);
    for (const fileAttachement of filesAttachements) {
      deleteFilesPromise.push(deleteOneFileInFirebase(route, fileAttachement));
    }
    await Promise.all(deleteFilesPromise);
  } catch (error) {
    console.error("Error on deleteMultipleFilesInFirebase :", error);
    throw error;
  }
};

const getFileSize = async (url: string): Promise<number> => {
  const fileRef = ref(storage, url);

  try {
    const metadata = await getMetadata(fileRef);
    const fileSize = metadata.size;
    return fileSize;
  } catch (error) {
    console.error("Error getting metadata:", error);
    throw error;
  }
};

const uploadImageToFirebase = async (
  files: Express.Multer.File[],
  id: number
): Promise<{ fileName: string; url: string }[]> => {
  const uploadPromises = files.map(async (file) => {
    if (!Array.isArray(files)) {
      throw new Error("Invalid files parameter. Expected an array of files.");
    }
    const storagePath = `users/${id}/`;
    let fileType = "";

    if (file.fieldname === "avatar") {
      fileType = "avatar";
    } else if (file.fieldname === "avatar_img") {
      fileType = "avatar_img";
    } else if (file.fieldname === "banner") {
      fileType = "banner";
    } else if (file.fieldname === "banner_img") {
      fileType = "banner_img";
    }

    const ext = file.mimetype.split("/")[1];
    const fileName = fileType;

    const storageRef = ref(storage, `${storagePath}${fileName}.${ext}`);

    const metadata = {
      contentType: file.mimetype,
    };

    const snapshot = await uploadBytesResumable(
      storageRef,
      file.buffer,
      metadata
    );

    const url = await getDownloadURL(snapshot.ref);

    return { fileName, url };
  });

  const uploadedImages = await Promise.all(uploadPromises);

  return uploadedImages;
};

const getUrlByNameAndRoute = async (route: string) => {
  const filepath = route;
  const fileRef = ref(storage, filepath);

  try {
    const url = await getDownloadURL(fileRef);
    if (url) {
      return url;
    }
  } catch (error) {
    console.error(error);
  }
  return null;
};

export {
  uploadToFirebase,
  uploadOneFileToFirebase,
  isStorageFolderEmpty,
  deleteFilesInFolder,
  deleteOneFileInFirebase,
  deleteMultipleFilesInFirebase,
  decodeUrlFirebase,
  getFileSize,
  uploadImageToFirebase,
  getUrlByNameAndRoute,
};
