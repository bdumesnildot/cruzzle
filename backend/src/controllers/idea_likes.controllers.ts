import { Request, Response } from "express";

import {
  create,
  findAll,
  findById,
  findTotalLikesReceivedByUserId,
  findByUserIdAndCommentId,
  remove,
} from "../models/idea_likes.models";

const getIdeaLikes = async (req: Request, res: Response) => {
  try {
    const data = await findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getIdeaLikesById = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const data = await findById(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).send("Idea Likes not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getTotalLikesReceivedByUserId = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.userId, 10);
  try {
    const data = await findTotalLikesReceivedByUserId(userId);
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send(error);
  }
};

const createIdeaLike = async (req: Request, res: Response) => {
  try {
    const commentlikes = req.body;

    const findCommentLike = await findByUserIdAndCommentId(
      req.body.user_id,
      req.body.idea_id
    );

    if (!findCommentLike) {
      const createdCommentLike = await create(commentlikes);
      res.status(201).json(createdCommentLike);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteIdeaLike = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const result = await remove(id);
    if (result) {
      res.status(204).json(result);
    } else {
      res.status(404).send("Comment Like not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export {
  getIdeaLikes,
  getIdeaLikesById,
  getTotalLikesReceivedByUserId,
  createIdeaLike,
  deleteIdeaLike,
};
