import { Request, Response } from "express";
import CategoryModel from "../../models/CategoryModel.ts";

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       401:
 *         description: Unauthorized
 */

const getCategories = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const categories = await CategoryModel.find();
    return res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({ error: "Error fetching categories" });
  }
};

export default getCategories;
