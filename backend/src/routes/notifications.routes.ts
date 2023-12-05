import express, { Request, Response, NextFunction } from "express";
import dayjs from "dayjs";
import {
  getNotificationIdea,
  createNotificationIdea,
  updateNotificationIdea,
  deleteNotificationIdea,
  deleteManyNotificationIdea,
} from "../controllers/notifications.ideas.controllers";
import { protectRoutes } from "../middlewares/auth.middlewares";

const router = express.Router();

const timeLog = (req: Request, res: Response, next: NextFunction) => {
  console.info("use /api/notifications/ at time: ", dayjs().format("HH:mm:ss"));
  next();
};
router.use(timeLog);

// Protected routes
router.use(protectRoutes);

router.post("/ideas", createNotificationIdea);
router.get("/ideas/:id", getNotificationIdea);
router.put("/ideas/delete", deleteManyNotificationIdea);
router.put("/ideas/:id", updateNotificationIdea);
router.delete("/ideas/:id", deleteNotificationIdea);

export default router;
