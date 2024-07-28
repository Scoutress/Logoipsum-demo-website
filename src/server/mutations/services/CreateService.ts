import { Request, Response } from "express";
import ServiceModel from "../../models/ServiceModel.ts";
import { serviceSchema } from "../../Schemas.ts";
import validate from "../../middleware/ValidationMiddleware.ts";

/**
 * @swagger
 * /services:
 *  post:
 *    description: Create a new service
 *    tags:
 *      - Services
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - description
 *              - address
 *              - category
 *              - contactPerson
 *              - email
 *              - photo
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
 *      201:
 *        description: Service created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Service'
 *      400:
 *        description: Invalid input
 *      500:
 *        description: An error occurred while creating the service
 */

const createService = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, description, address, category, contactPerson, email, photo } =
    req.body;

  try {
    const newService = await ServiceModel.create({
      name,
      description,
      address,
      category,
      contactPerson,
      email,
      photo,
    });
    return res.status(201).json(newService);
  } catch (err) {
    console.error("Error creating service:", err);
    return res
      .status(500)
      .json({ error: "An error occurred while creating the service" });
  }
};

export default [validate(serviceSchema), createService];
