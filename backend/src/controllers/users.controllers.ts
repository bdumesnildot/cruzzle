import { Request, Response } from "express";
import dayjs from "dayjs";
import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import axios from "axios";
import {
  findAll,
  findById,
  findByMail,
  update,
  updatePassword,
  updateUserImage,
  findActivitiesById,
  findContributionsById,
  findLeaderboard,
} from "../models/user.model";
import {
  uploadImageToFirebase,
  getUrlByNameAndRoute,
} from "../services/firebase";
import { verifyPassword } from "../middlewares/auth.middlewares";
import findByFilter from "../models/userFilter.model";
import {
  FormattedUserLeaderboard,
  FormatedDataItem,
  UserFilterQuery,
  FormatedDataActivities,
} from "../interfaces/users.interface";
import calculateLeaderboardScore from "../utils/leaderboard";
import "dayjs/locale/fr";

dotenv.config();
const { JWT_SECRET } = process.env;

// Show all users
const getUsers = async (req: Request, res: Response) => {
  try {
    const data = await findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Show top 3 Cruzzlers for the current month
const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const data = await findLeaderboard();
    if (data) {
      const formattedData: FormattedUserLeaderboard[] = data
        .map((item) => {
          const { _count: count, ...rest } = item;
          return {
            ...rest,
            score: calculateLeaderboardScore(item),
          };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
      return res.status(200).send(formattedData);
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).send(error);
  }
};

// Show specific user based on their ID
const getUserById = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const data = await findById(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Login validation based on email and password verification & generation of token
const login = async (req: Request, res: Response) => {
  const { mail } = req.body;
  try {
    const data = await findByMail(mail);
    if (data) {
      await verifyPassword(req, res, () => {
        try {
          const payload = {
            id: data.id,
            role_id: data.role_id,
          };

          const token = jwt.sign(payload, JWT_SECRET as Secret, {
            algorithm: "HS256",
            expiresIn: "12h",
          });
          res.status(200).json({ token });
        } catch (error) {
          console.error("Error generating token:", error);
          res.status(500).send("Error generating token");
        }
      });
    } else {
      res.status(401).send("No match: Invalid email or password");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send(error);
  }
};

// Update user
const updateUser = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const updatedUser = req.body;
  try {
    const result = await update(id, updatedUser);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
// Update Password user
const updatePasswordUser = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const result = await updatePassword(data);
    if (result) {
      res.sendStatus(200);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Verify password
const verifyPasswordUser = async (req: Request, res: Response) => {
  try {
    const { mail, password } = req.body;
    const dataUser = await findByMail(mail);

    if (dataUser) {
      const passwordMatch = await bcrypt.compare(
        password,
        dataUser.hashed_password
      );

      const data = {
        id: dataUser.id,
        mail: dataUser.mail,
      };

      if (passwordMatch) {
        res.status(200).json(data);
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.error("Error verifying passwords:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Filter users
const getUserByFilter = async (req: Request, res: Response) => {
  const filterQuery: UserFilterQuery = req.query;

  try {
    const data = await findByFilter(filterQuery);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getImageHighRes = async (req: Request, res: Response) => {
  const { url } = req.query;
  if (typeof url === "string") {
    const getUrl = await getUrlByNameAndRoute(url);
    if (getUrl) {
      try {
        const response = await axios.get(getUrl, {
          responseType: "arraybuffer",
        });

        if (response.data) {
          const buffer = Buffer.from(response.data, "binary");
          const fileName = `${url.split("/")[url.split("/").length - 1]}`;

          const mimeType = `image/${fileName.split(".")[1]}`;

          res.set({
            "Content-Type": mimeType,
            "Content-Disposition": `attachment; filename=${fileName}`,
          });

          res.send(buffer);
        } else {
          res.status(404).send("Image not found");
        }
      } catch (error) {
        console.error(error);
        res.status(500).send("Error downloading image");
      }
    }
  }
};

const updateImage = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const files: Express.Multer.File[] = req.files as Express.Multer.File[];

  try {
    if (files) {
      const isCropOnly = files.length === 1;
      if (!isCropOnly) {
        const uploads = await uploadImageToFirebase(files, id);
        if (uploads) {
          const uploadBlob = uploads.filter(
            (item) => !item.fileName.includes("_img")
          );

          const key = `${uploadBlob[0].fileName}_url`;
          const updatedImage = { [key]: uploadBlob[0].url };

          const updateImageUser = await updateUserImage(updatedImage, id);
          if (updateImageUser) {
            res.status(201).json(updateImageUser);
          } else {
            res.status(404).json({ message: "Not found user" });
          }
        }
      } else {
        const uploadABlob = files[0];
        const upload = await uploadImageToFirebase([uploadABlob], id);
        if (upload) {
          const { fieldname } = uploadABlob;
          const key = `${fieldname}_url`;
          const updatedImage = { [key]: upload[0].url };

          const updateImageUser = await updateUserImage(updatedImage, id);
          if (updateImageUser) {
            res.status(201).json(updateImageUser);
          } else {
            res.status(404).json({ message: "Not found user" });
          }
        } else {
          res.status(500).json({ message: "Upload to firebase failed" });
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
};

const getActivitiesByUserId = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const data = await findActivitiesById(id);
    if (data) {
      const formatedData: FormatedDataActivities[] = [];
      if (data.idea_like) {
        data.idea_like.map((item) =>
          formatedData.push({
            type: "liked",
            created_at: item.liked_at,
            title: item.idea?.title || "",
          })
        );
      }
      if (data.comment) {
        data.comment.map((item) =>
          formatedData.push({
            type: "comment",
            created_at: item.created_at,
            title: item.idea?.title || "",
          })
        );
      }
      const sortedList = formatedData.sort((a, b) => {
        const dateA = new Date(dayjs(a.created_at, "DD/MM/YYYY").toDate());
        const dateB = new Date(dayjs(b.created_at, "DD/MM/YYYY").toDate());
        if (dateA > dateB) {
          return -1;
        }
        if (dateA < dateB) {
          return 1;
        }
        return 0;
      });
      res.status(200).json(sortedList);
    } else {
      res.status(404).send("Idea Likes not found");
    }
  } catch (error) {
    console.info(error);
    res.status(500).send(error);
  }
};

const getContributionsByUserId = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const data = await findContributionsById(id);
    if (data) {
      const formatedData: FormatedDataItem[] = [];
      if (data.idea_teams) {
        data.idea_teams.map((item) =>
          formatedData.push({ ...item.idea, type: "added" })
        );
      }
      if (data.idea) {
        data.idea.map((item) =>
          formatedData.push({ ...item, type: "created" })
        );
      }
      const sortedList = formatedData.sort((a, b) => {
        const dateA = new Date(dayjs(a.created_at, "DD/MM/YYYY").toDate());
        const dateB = new Date(dayjs(b.created_at, "DD/MM/YYYY").toDate());
        if (dateA > dateB) {
          return -1;
        }
        if (dateA < dateB) {
          return 1;
        }
        return 0;
      });
      res.status(200).json(sortedList);
    } else {
      res.status(404).send("Idea Likes not found");
    }
  } catch (error) {
    console.info(error);
    res.status(500).send(error);
  }
};

export {
  getUsers,
  getUserById,
  login,
  updateUser,
  getUserByFilter,
  getActivitiesByUserId,
  updateImage,
  getImageHighRes,
  verifyPasswordUser,
  updatePasswordUser,
  getContributionsByUserId,
  getLeaderboard,
};
