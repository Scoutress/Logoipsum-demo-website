import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
}

export interface AuthenticatedRequest extends Request {
  currentUser?: JwtPayload;
}

const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Response | void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ error: "Not authenticated" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(
      token,
      process.env.TOKEN_SECRET as string
    ) as JwtPayload;
    req.currentUser = payload;
    next();
  } catch (err) {
    return res.status(401).send({ error: "Not authenticated" });
  }
};

export default authMiddleware;
