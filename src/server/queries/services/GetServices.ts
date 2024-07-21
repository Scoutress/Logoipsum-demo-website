import { Request, Response } from "express";
import ServiceModel from "../../models/ServiceModel.ts";

/**
 * @swagger
 * /services:
 *  get:
 *    description: Get all services
 *    tags:
 *      - Services
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Service'
 */

const getServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const services = await ServiceModel.find();
    res.status(200).json(services);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching services" });
  }
};

export default getServices;
