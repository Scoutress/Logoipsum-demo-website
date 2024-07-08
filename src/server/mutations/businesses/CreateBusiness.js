import BusinessModel from "../../models/BusinessModel.js";
import { businessSchema } from "../../schemas.js";
import validate from "../../middleware/ValidationMiddleware.js";

/**
 * @swagger
 * /api/businesses:
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

  console.log("Received request to create business with data:", req.body);

  try {
    console.log("Attempting to create new business with data:", {
      name,
      description,
      address,
      category,
      contactPerson,
      email,
      photo,
    });

    const newBusiness = await BusinessModel.create({
      name,
      description,
      address,
      category,
      contactPerson,
      email,
      photo,
    });

    console.log("New business created successfully:", newBusiness);
    res.status(201).json(newBusiness);
  } catch (err) {
    console.error(
      "An error occurred while creating the business:",
      err.message
    );
    res
      .status(500)
      .json({ error: "An error occurred while creating the business" });
  }
};

export default [validate(businessSchema), createBusiness];
