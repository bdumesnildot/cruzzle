import express, { Request, Response, NextFunction } from "express";
import dayjs from "dayjs";
import {
  getIdeas,
  getTotalIdeasCount,
  getIdeaById,
  getIdeaByFilter,
  getIdeasCreatedToday,
  postIdea,
  deleteIdeaById,
  archivedIdeaById,
  getIdeasTrends,
  getIdeasTrendsFavorits,
  updateIdeaById,
  updateIdeaViewById,
} from "../controllers/ideas.controllers";
import { uploadFilesIdea } from "../middlewares/multer.middlewares";
import { protectRoutes } from "../middlewares/auth.middlewares";
import { verifyAuthor } from "../middlewares/idea.middlewares";

const router = express.Router();

const timeLog = (req: Request, res: Response, next: NextFunction) => {
  console.info("use /api/ideas/ at time: ", dayjs().format("HH:mm:ss"));
  next();
};
router.use(timeLog);

// Protected routes
router.use(protectRoutes);

router.get("/", getIdeas);
router.get("/total", getTotalIdeasCount);
router.get("/filter", getIdeaByFilter);
router.get("/trends", getIdeasTrends);
router.get("/trends/:id", getIdeasTrendsFavorits);

router.get("/edit/:id", verifyAuthor, getIdeaById);
router.get("/:id", getIdeaById);
router.get("/:userId/count", getIdeasCreatedToday);

router.post("/", uploadFilesIdea, postIdea);

router.patch("/archive/:id", archivedIdeaById);
router.put("/:id", verifyAuthor, uploadFilesIdea, updateIdeaById);
router.patch("/views/:id", updateIdeaViewById);

router.delete("/:id", deleteIdeaById);

export default router;
