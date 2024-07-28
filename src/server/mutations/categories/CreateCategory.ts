import { Request, Response } from "express";
import CategoryModel from "../../models/CategoryModel.ts";
import { categorySchema } from "../../Schemas.ts";
import validate from "../../middleware/ValidationMiddleware.ts";

/**
 * @swagger
 * /categories:
 *  post:
 *    description: Add a new category
 *    tags:
 *      - Categories
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *            properties:
 *              name:
 *                type: string
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Category'
 */

const createCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name } = req.body;

  try {
    const newCategory = new CategoryModel({
      name,
    });

    await newCategory.save();

    return res.status(201).json(newCategory);
  } catch (err) {
    console.error("Error creating category:", err);
    return res.status(500).json({ error: "Error creating category" });
  }
};

export default [validate(categorySchema), createCategory];
