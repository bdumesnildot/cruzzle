import express, { Request, Response, NextFunction } from "express";
import dayjs from "dayjs";
import { getAgencies } from "../controllers/agencies.controllers";
import { protectRoutes } from "../middlewares/auth.middlewares";

const router = express.Router();

const timeLog = (req: Request, res: Response, next: NextFunction) => {
  console.info("use /api/agencies/ at time: ", dayjs().format("HH:mm:ss"));
  next();
};
router.use(timeLog);

// Protected routes
router.use(protectRoutes);

router.get("/", getAgencies);

export default router;
