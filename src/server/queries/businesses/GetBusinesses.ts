import { Request, Response } from "express";
import BusinessModel from "../../models/BusinessModel.ts";

/**
 * @swagger
 * /businesses:
 *  get:
 *    description: Get all businesses
 *    tags:
 *      - Businesses
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Business'
 */

const getBusinesses = async (req: Request, res: Response): Promise<void> => {
  try {
    const businesses = await BusinessModel.find();
    res.status(200).json(businesses);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching businesses" });
  }
};

export default getBusinesses;
