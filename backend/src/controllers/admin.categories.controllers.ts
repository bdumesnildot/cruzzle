import { Request, Response } from "express";
import {
  findAllByAdmin,
  createByAdmin,
  updateByIdByAdmin,
  deleteByIdByAdmin,
} from "../models/admin.category.model";

const getCategoriesByAdmin = async (req: Request, res: Response) => {
  try {
    const data = await findAllByAdmin();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createCategoryByAdmin = async (req: Request, res: Response) => {
  const category = req.body;
  try {
    const data = await createByAdmin(category);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateCategoryByIdByAdmin = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const updatedCategory = req.body;
  try {
    const data = await updateByIdByAdmin(id, updatedCategory);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteCategoryByIdByAdmin = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    const data = await deleteByIdByAdmin(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

export {
  getCategoriesByAdmin,
  createCategoryByAdmin,
  updateCategoryByIdByAdmin,
  deleteCategoryByIdByAdmin,
};
