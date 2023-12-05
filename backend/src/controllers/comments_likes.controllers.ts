import { Request, Response } from "express";

import {
  create,
  findAll,
  findById,
  findByUserIdAndCommentId,
  remove,
} from "../models/comments_likes.models";

const getCommentsLikes = async (req: Request, res: Response) => {
  try {
    const data = await findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCommentsLikesById = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const data = await findById(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).send("Comment Likes not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const createCommentLike = async (req: Request, res: Response) => {
  try {
    const commentlikes = req.body;

    const findCommentLike = await findByUserIdAndCommentId(
      req.body.user_id,
      req.body.comment_id
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

const deleteCommentLike = async (req: Request, res: Response) => {
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
  getCommentsLikes,
  getCommentsLikesById,
  createCommentLike,
  deleteCommentLike,
};
