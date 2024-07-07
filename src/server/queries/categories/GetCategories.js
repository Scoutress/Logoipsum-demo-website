import CategoryModel from "../../models/CategoryModel.js";

/**
 * @swagger
 * /api/categories:
 *  get:
 *    description: Get all categories
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Category'
 */

const getServices = async (req, res) => {
  const services = await CategoryModel.find();
  res.status(200).json(services);
};

export default getServices;
