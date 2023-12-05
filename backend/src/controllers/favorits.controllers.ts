import { Request, Response } from "express";

import {
  findAll,
  findByFilter,
  createFavorit,
  deleteFavorit,
} from "../models/favorit.model";
import { IdeaFilterQuery } from "../interfaces/ideas.interface";

const getFavorits = async (req: Request, res: Response) => {
  try {
    const data = await findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getFavoritesByFilter = async (req: Request, res: Response) => {
  const filterQuery: IdeaFilterQuery = req.query;
  try {
    const data = await findByFilter(filterQuery);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const postFavorit = async (req: Request, res: Response) => {
  try {
    const { userId, ideaId } = req.body;

    const data = await createFavorit(userId, ideaId);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const removeFavorit = async (req: Request, res: Response) => {
  try {
    const { userId, ideaId } = req.body;

    await deleteFavorit(userId, ideaId);
    res.status(200).send("Favorit successfully deleted");
  } catch (error) {
    res.status(500).send(error);
  }
};

export { getFavorits, getFavoritesByFilter, postFavorit, removeFavorit };
