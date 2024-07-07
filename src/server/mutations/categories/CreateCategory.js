import CategoryModel from "../../models/CategoryModel.js";

/**
 * @swagger
 * /api/categories:
 *  post:
 *    description: Add a new category
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

  console.log("Received request to create category with data:", req.body);

  if (!name || !backgroundColor || !photo) {
    console.error("Invalid input data:", req.body);
    return res.status(400).json({ error: "Invalid input" });
  }

  const categoryProps = {
    name,
    backgroundColor,
    photo,
  };

  console.log("Attempting to create new category with data:", categoryProps);

  try {
    const newCategory = await CategoryModel.create(categoryProps);
    console.log("New category created successfully:", newCategory);
    res.status(200).json(newCategory);
  } catch (err) {
    console.error("Error creating category:", err.message);
    res.status(500).json({ error: "Error creating category" });
  }
};

export default createCategory;
