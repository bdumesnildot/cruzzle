import { Request, Response } from "express";
import {
  findAllByAdmin,
  updateByIdByAdmin,
} from "../models/admin.position.model";

const getPositionsByAdmin = async (req: Request, res: Response) => {
  try {
    const data = await findAllByAdmin();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updatePositionByIdByAdmin = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const updatedRole = req.body;
  try {
    const data = await updateByIdByAdmin(id, updatedRole);
    if (data) {
      res.sendStatus(200);
    } else {
      res.status(404).json({ message: "Not found, cannot update position" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export { getPositionsByAdmin, updatePositionByIdByAdmin };
