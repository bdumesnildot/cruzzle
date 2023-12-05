import express, { Request, Response, NextFunction } from "express";
import dayjs from "dayjs";
import {
  getUsersByAdmin,
  CreateUserByAdmin,
  updateUserByIdByAdmin,
  updateUserRoleByIdBySuperAdmin,
} from "../controllers/admin.users.controllers";
import {
  getIdeasByAdmin,
  ArchiveByIdByAdmin,
  DeleteByIdByAdmin,
} from "../controllers/admin.ideas.controllers";
import { getRolesByAdmin } from "../controllers/admin.roles.controllers";
import { getAgenciesByAdmin } from "../controllers/admin.agencies.controllers";
import { getPositionsByAdmin } from "../controllers/admin.positions.controllers";
import {
  getCategoriesByAdmin,
  createCategoryByAdmin,
  updateCategoryByIdByAdmin,
  deleteCategoryByIdByAdmin,
} from "../controllers/admin.categories.controllers";

import {
  hashPassword,
  protectAdminRoutes,
  protectSuperAdminRoutes,
} from "../middlewares/auth.middlewares";

const router = express.Router();

const timeLog = (req: Request, res: Response, next: NextFunction) => {
  console.info("use /api/admin/ at time: ", dayjs().format("HH:mm:ss"));
  next();
};
router.use(timeLog);

// Protected Admin routes
router.use(protectAdminRoutes);

router.get("/users", getUsersByAdmin);
router.post("/users", hashPassword, CreateUserByAdmin);
router.put("/users/:id", hashPassword, updateUserByIdByAdmin);

router.get("/ideas", getIdeasByAdmin);
router.put("/ideas/archive/:id", ArchiveByIdByAdmin);
router.put("/ideas/delete/:id", DeleteByIdByAdmin);

router.get("/roles", getRolesByAdmin);

router.get("/agencies", getAgenciesByAdmin);

router.get("/positions", getPositionsByAdmin);

router.get("/categories", getCategoriesByAdmin);
router.post("/categories", createCategoryByAdmin);
router.put("/categories/:id", updateCategoryByIdByAdmin);
router.delete("/categories/:id", deleteCategoryByIdByAdmin);

// Protected Admin routes
router.use(protectSuperAdminRoutes);

router.put("/users/roles/:id", updateUserRoleByIdBySuperAdmin);

export default router;
