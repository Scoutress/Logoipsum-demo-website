import { Request, Response } from "express";
import CategoryModel from "../../models/CategoryModel.ts";

/**
 * @swagger
 * /categories:
 *  get:
 *    description: Get all categories
 *    tags:
 *      - Categories
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Category'
 */

const getServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const services = await CategoryModel.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve categories" });
  }
};

export default getServices;
