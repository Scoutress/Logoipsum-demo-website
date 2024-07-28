import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  console.error(err.stack);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).json({
    error: err.message || "An unexpected error occurred",
  });
};

export default errorHandler;
