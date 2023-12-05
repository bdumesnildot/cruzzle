import { Request, Response } from "express";
import {
  findAllByUserId,
  create,
  updateById,
  deleteById,
  deleteByIitem,
} from "../models/notification.ideas.model";

const getNotificationIdea = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    const data = await findAllByUserId(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createNotificationIdea = async (req: Request, res: Response) => {
  const notification = req.body;
  try {
    const data = await create(notification);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateNotificationIdea = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const notification = req.body;
  try {
    const data = await updateById(id, notification);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteNotificationIdea = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  try {
    const data = await deleteById(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteManyNotificationIdea = async (req: Request, res: Response) => {
  const notification = req.body;
  try {
    const data = await deleteByIitem(notification);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

export {
  getNotificationIdea,
  createNotificationIdea,
  updateNotificationIdea,
  deleteNotificationIdea,
  deleteManyNotificationIdea,
};
