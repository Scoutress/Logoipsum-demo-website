import BusinessModel from "../../models/BusinessModel.js";

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

const getBusinesses = async (req, res) => {
  const businesses = await BusinessModel.find();
  res.status(200).json(businesses);
};

export default getBusinesses;
