import express, { Request, Response, NextFunction } from "express";
import dayjs from "dayjs";
import { getPositions } from "../controllers/positions.controllers";
import { protectRoutes } from "../middlewares/auth.middlewares";

const router = express.Router();

const timeLog = (req: Request, res: Response, next: NextFunction) => {
  console.info("use /api/positions/ at time: ", dayjs().format("HH:mm:ss"));
  next();
};
router.use(timeLog);

// Protected routes
router.use(protectRoutes);

router.get("/", getPositions);

export default router;
