import { Request, Response } from "express";
import {
  findAllByAdmin,
  createByAdmin,
  updateByIdByAdmin,
} from "../models/admin.user.model";

const getUsersByAdmin = async (req: Request, res: Response) => {
  try {
    const data = await findAllByAdmin();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const CreateUserByAdmin = async (req: Request, res: Response) => {
  const newUser = req.body;
  try {
    const data = await createByAdmin(newUser);
    if (data.status === "success") {
      res.status(201).json(data.user);
    } else if (data.status === "conflict") {
      res.status(409).json(data.message);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUserByIdByAdmin = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const updatedUser = req.body;

  if (updatedUser.role_id) {
    delete updatedUser.role_id;
  }

  try {
    const data = await updateByIdByAdmin(id, updatedUser);
    if (data.status === "success" && data.user) {
      res.sendStatus(200);
    } else if (data.status === "success" && !data.user) {
      res.status(404).json({ message: "Not found, cannot update user" });
    } else if (data.status === "conflict") {
      res.status(409).json(data.message);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUserRoleByIdBySuperAdmin = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const updatedUser = req.body;

  try {
    const data = await updateByIdByAdmin(id, updatedUser);
    if (data.status === "success" && data.user) {
      res.sendStatus(200);
    } else if (data.status === "success" && !data.user) {
      res.status(404).json({ message: "Not found, cannot update user" });
    } else if (data.status === "conflict") {
      res.status(409).json(data.message);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export {
  getUsersByAdmin,
  CreateUserByAdmin,
  updateUserByIdByAdmin,
  updateUserRoleByIdBySuperAdmin,
};
