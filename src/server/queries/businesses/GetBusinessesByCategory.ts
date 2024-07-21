import { Request, Response } from "express";
import BusinessModel from "../../models/BusinessModel.ts";

/**
 * @swagger
 * /businesses/category/{category}:
 *  get:
 *    description: Get businesses by category
 *    tags:
 *      - Businesses
 *    parameters:
 *      - in: path
 *        name: category
 *        schema:
 *          type: string
 *        required: true
 *        description: The category of the businesses
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Business'
 *      404:
 *        description: Category not found
 */

const getBusinessesByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { category } = req.params;
  try {
    const businesses = await BusinessModel.find({ category });
    if (businesses.length === 0) {
      res.status(404).json({ error: "No businesses found for this category" });
      return;
    }
    res.status(200).json(businesses);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching businesses" });
  }
};

export default getBusinessesByCategory;
