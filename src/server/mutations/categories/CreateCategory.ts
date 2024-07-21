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
 *              - backgroundColor
 *              - photo
 *            properties:
 *              name:
 *                type: string
 *              backgroundColor:
 *                type: string
 *              photo:
 *                type: string
 *    responses:
 *      200:
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
  const { name, backgroundColor, photo } = req.body;

  const categoryProps = {
    name,
    backgroundColor,
    photo,
  };

  try {
    const newCategory = await CategoryModel.create(categoryProps);
    return res.status(200).json(newCategory);
  } catch (err) {
    console.error("Error creating category:", err);
    return res.status(500).json({ error: "Error creating category" });
  }
};

export default [validate(categorySchema), createCategory];
