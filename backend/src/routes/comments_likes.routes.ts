import express, { Request, Response, NextFunction } from "express";
import dayjs from "dayjs";
import {
  createCommentLike,
  deleteCommentLike,
  getCommentsLikes,
  getCommentsLikesById,
} from "../controllers/comments_likes.controllers";
import { protectRoutes } from "../middlewares/auth.middlewares";

const router = express.Router();

const timeLog = (req: Request, res: Response, next: NextFunction) => {
  console.info("use /api/likes at time: ", dayjs().format("HH:mm:ss"));
  next();
};
router.use(timeLog);

// Protected routes
router.use(protectRoutes);

router.get("/", getCommentsLikes);
router.get("/:id", getCommentsLikesById);
router.post("/", createCommentLike);

router.delete("/:id", deleteCommentLike);

export default router;
