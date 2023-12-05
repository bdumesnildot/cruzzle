import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const { JWT_SECRET } = process.env;

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  const userId = parseInt(req.params.id, 10);

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET as Secret) as JwtPayload;

    if (payload.id === userId || payload.role_id !== 0) {
      return next();
    }
  } catch (error) {
    console.error("Invalid User:", error);
    return res.status(401).json({ error: "Invalid User." });
  }
  return res.status(401).json({ error: "Invalid User." });
};

const verifyUserByIdBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  const userId = parseInt(req.body.id, 10);

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET as Secret) as JwtPayload;

    if (payload.id === userId || payload.role_id !== 0) {
      return next();
    }
  } catch (error) {
    console.error("Invalid User:", error);
    return res.status(401).json({ error: "Invalid User." });
  }
  return res.status(401).json({ error: "Invalid User." });
};

// eslint-disable-next-line import/prefer-default-export
export { verifyUser, verifyUserByIdBody };
