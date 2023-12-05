import express, { Request, Response, NextFunction } from "express";
import dayjs from "dayjs";
import {
  creatComment,
  deleteComment,
  getCommentByIdeaId,
  getCommentReceivedByUserId,
  getComments,
  updateComment,
} from "../controllers/comments.controllers";
import { protectRoutes } from "../middlewares/auth.middlewares";

const router = express.Router();

const timeLog = (req: Request, res: Response, next: NextFunction) => {
  console.info("use /api/comments at time: ", dayjs().format("HH:mm:ss"));
  next();
};
router.use(timeLog);

// Protected routes
router.use(protectRoutes);

router.get("/", getComments);
router.get("/:id", getCommentByIdeaId);
router.get("/user/:userId", getCommentReceivedByUserId);

router.post("/", creatComment);
router.put("/:id", updateComment);

router.delete("/:id", deleteComment);

export default router;
