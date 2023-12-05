import { Request, Response } from "express";

import {
  findByIdeaId,
  findTotalCommentsReceivedByUserId,
  findAll,
  addComment,
  deleteCommentById,
  editComment,
} from "../models/comments.models";

const getComments = async (req: Request, res: Response) => {
  try {
    const data = await findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCommentByIdeaId = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const data = await findByIdeaId(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).send("Idea not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCommentReceivedByUserId = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.userId, 10);
  try {
    const data = await findTotalCommentsReceivedByUserId(userId);
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send(error);
  }
};

const creatComment = async (req: Request, res: Response) => {
  try {
    const comment = req.body;
    const data = await addComment(comment);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateComment = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const comment = req.body;
  try {
    const result = await editComment(comment, id);
    if (result) {
      res.status(201).json(result);
    } else {
      res.status(404).send("Comment not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteComment = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const result = await deleteCommentById(id);
    if (result) {
      res.status(204).json(result);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export {
  getComments,
  getCommentByIdeaId,
  getCommentReceivedByUserId,
  creatComment,
  deleteComment,
  updateComment,
};
