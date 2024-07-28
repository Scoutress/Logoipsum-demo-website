import { Request, Response } from "express";
import ServiceModel from "../../models/ServiceModel.ts";

/**
 * @swagger
 * /services/{id}:
 *  get:
 *    description: Get a service by ID
 *    tags:
 *      - Services
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The ID of the service
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Service'
 *      404:
 *        description: Service not found
 */

const getServiceById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const service = await ServiceModel.findById(id);
    if (!service) {
      res.status(404).json({ error: "Service not found" });
      return;
    }
    res.status(200).json(service);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the service" });
  }
};

export default getServiceById;
