import CategoryModel from "../../models/CategoryModel.js";

/**
 * @swagger
 * /categories:
 *  post:
 *    description: Add a new category
 *    tags:
 *      - Categories
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - backgroundColor
 *              - photo
 *            properties:
 *              name:
 *                type: string
 *              backgroundColor:
 *                type: string
 *              photo:
 *                type: string
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Category'
 */

const createCategory = async (req, res) => {
  const { name, backgroundColor, photo } = req.body;

  if (!name || !backgroundColor || !photo) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const categoryProps = {
    name,
    backgroundColor,
    photo,
  };

  try {
    const newCategory = await CategoryModel.create(categoryProps);
    return res.status(200).json(newCategory);
  } catch (err) {
    return res.status(500).json({ error: "Error creating category" });
  }
};

export default createCategory;
