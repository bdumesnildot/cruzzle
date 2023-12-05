import express, { Request, Response, NextFunction } from "express";
import dayjs from "dayjs";
import {
  getIdeaLikes,
  getIdeaLikesById,
  getTotalLikesReceivedByUserId,
  createIdeaLike,
  deleteIdeaLike,
} from "../controllers/idea_likes.controllers";
import { protectRoutes } from "../middlewares/auth.middlewares";

const router = express.Router();

const timeLog = (req: Request, res: Response, next: NextFunction) => {
  console.info("use /api/ideas/likes at time: ", dayjs().format("HH:mm:ss"));
  next();
};
router.use(timeLog);

// Protected routes
router.use(protectRoutes);

router.get("/", getIdeaLikes);
router.get("/:id", getIdeaLikesById);
router.get("/users/:userId", getTotalLikesReceivedByUserId);
router.post("/", createIdeaLike);

router.delete("/:id", deleteIdeaLike);

export default router;
