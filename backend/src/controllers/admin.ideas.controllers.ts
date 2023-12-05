import { Request, Response } from "express";
import {
  findAllByAdmin,
  ArchiveIdeaByAdmin,
  DeleteIdeaByAdmin,
} from "../models/admin.idea.model";

const getIdeasByAdmin = async (req: Request, res: Response) => {
  try {
    const data = await findAllByAdmin();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const ArchiveByIdByAdmin = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    const data = await ArchiveIdeaByAdmin(id);
    if (data) {
      res.sendStatus(200);
    } else {
      res.status(404).json({ message: "Idea not found" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const DeleteByIdByAdmin = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    const data = await DeleteIdeaByAdmin(id);
    if (data) {
      res.sendStatus(200);
    } else {
      res.status(404).json({ message: "Idea not found" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export { getIdeasByAdmin, ArchiveByIdByAdmin, DeleteByIdByAdmin };
