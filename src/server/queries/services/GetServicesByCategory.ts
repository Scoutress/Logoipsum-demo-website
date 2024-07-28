import { Request, Response } from "express";
import ServiceModel from "../../models/ServiceModel.ts";

/**
 * @swagger
 * /services/category/{category}:
 *  get:
 *    description: Get services by category
 *    tags:
 *      - Services
 *    parameters:
 *      - in: path
 *        name: category
 *        schema:
 *          type: string
 *        required: true
 *        description: The category of the services
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Service'
 *      404:
 *        description: Category not found
 */

const getServicesByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { category } = req.params;
  try {
    const services = await ServiceModel.find({ category });
    if (services.length === 0) {
      res.status(404).json({ error: "No services found for this category" });
      return;
    }
    res.status(200).json(services);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching services" });
  }
};

export default getServicesByCategory;
