import BusinessModel from "../../models/BusinessModel.js";
import { businessSchema } from "../../schemas.js";
import validate from "../../middleware/ValidationMiddleware.js";

/**
 * @swagger
 * /businesses:
 *  post:
 *    description: Create a new business
 *    tags:
 *      - Businesses
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
 *        description: Business created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Business'
 *      400:
 *        description: Invalid input
 *      500:
 *        description: An error occurred while creating the business
 */

const createBusiness = async (req, res) => {
  const { name, description, address, category, contactPerson, email, photo } =
    req.body;

  try {
    const newBusiness = await BusinessModel.create({
      name,
      description,
      address,
      category,
      contactPerson,
      email,
      photo,
    });
    return res.status(201).json(newBusiness);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "An error occurred while creating the business" });
  }
};

export default [validate(businessSchema), createBusiness];
