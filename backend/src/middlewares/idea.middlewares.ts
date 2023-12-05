import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { findById } from "../models/idea.model";

const { JWT_SECRET } = process.env;

const verifyAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  const ideaId = parseInt(req.params.id, 10);

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET as Secret) as JwtPayload;
    const getAuthorId = await findById(ideaId);

    if (
      (getAuthorId && payload.id === getAuthorId.user.id) ||
      payload.role_id !== 0
    ) {
      return next();
    }
  } catch (error) {
    console.error("Invalid User:", error);
    return res.status(401).json({ error: "Invalid User." });
  }
  return res.status(401).json({ error: "Invalid User." });
};

// eslint-disable-next-line import/prefer-default-export
export { verifyAuthor };
