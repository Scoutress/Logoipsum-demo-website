import { Request, Response } from "express";
import BusinessModel from "../../models/BusinessModel.ts";

/**
 * @swagger
 * /businesses/{id}:
 *  get:
 *    description: Get a business by ID
 *    tags:
 *      - Businesses
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The ID of the business
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Business'
 *      404:
 *        description: Business not found
 */

const getBusinessById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const business = await BusinessModel.findById(id);
    if (!business) {
      res.status(404).json({ error: "Business not found" });
      return;
    }
    res.status(200).json(business);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the business" });
  }
};

export default getBusinessById;
