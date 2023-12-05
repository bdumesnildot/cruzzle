import express, { Request, Response, NextFunction } from "express";
import dayjs from "dayjs";
import { uploadImage } from "../middlewares/multer.middlewares";
import {
  login,
  getUsers,
  getUserById,
  updateUser,
  getUserByFilter,
  updateImage,
  getImageHighRes,
  verifyPasswordUser,
  updatePasswordUser,
  getActivitiesByUserId,
  getContributionsByUserId,
  getLeaderboard,
} from "../controllers/users.controllers";

import {
  hashPassword,
  verifyPassword,
  protectRoutes,
} from "../middlewares/auth.middlewares";
import {
  verifyUser,
  verifyUserByIdBody,
} from "../middlewares/user.middlewares";

const router = express.Router();

const timeLog = (req: Request, res: Response, next: NextFunction) => {
  console.info("use /api/users/ at time: ", dayjs().format("HH:mm:ss"));
  next();
};
router.use(timeLog);

// Public route
router.post("/login", verifyPassword, login);

// Protected routes
router.use(protectRoutes);

router.get("/", getUsers);
router.get("/filter", getUserByFilter);
router.get("/activities/:id", getActivitiesByUserId);
router.get("/contributions/:id", getContributionsByUserId);
router.get("/image", getImageHighRes);
router.get("/leaderboard", getLeaderboard);
router.get("/:id", getUserById);
router.post("/image/:id", verifyUser, uploadImage, updateImage);
router.post("/verifyPassword", verifyPasswordUser);

router.put(
  "/updatePassword",
  verifyUserByIdBody,
  hashPassword,
  updatePasswordUser
);
router.put("/:id", verifyUser, hashPassword, updateUser);

export default router;
