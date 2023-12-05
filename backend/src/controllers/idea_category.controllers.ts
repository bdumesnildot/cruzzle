import { Request, Response } from "express";
import { countCategoryUsage } from "../models/idea_category.models";

const getCategoriesUsageCount = async (req: Request, res: Response) => {
  try {
    const data = await countCategoryUsage();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default getCategoriesUsageCount;
