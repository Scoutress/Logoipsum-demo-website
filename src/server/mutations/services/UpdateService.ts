import { Request, Response } from "express";
import ServiceModel, { IService } from "../../models/ServiceModel.ts";

/**
 * @swagger
 * /services/{id}:
 *  put:
 *    description: Update an existing service
 *    tags:
 *      - Services
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The ID of the service
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              description:
 *                type: string
 *              address:
 *                type: string
 *              category:
 *                type: string
 *              contactPerson:
 *                type: string
 *              email:
 *                type: string
 *              photo:
 *                type: string
 *    responses:
 *      200:
 *        description: Service updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Service'
 *      400:
 *        description: Invalid input
 *      404:
 *        description: Service not found
 *      500:
 *        description: An error occurred while updating the service
 */

const updateService = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const updateData: Partial<IService> = req.body;

  try {
    const service: IService | null = await ServiceModel.findById(id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    Object.assign(service, updateData);

    const updatedService: IService = await service.save();
    return res.status(200).json(updatedService);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "An error occurred while updating the service" });
  }
};

export default updateService;
