import { Request, Response, NextFunction } from "express";
import { Schema, ValidationError } from "joi";

const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error }: { error?: ValidationError } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      next();
    }
  };
};

export default validate;
