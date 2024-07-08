import BusinessModel from "../../models/BusinessModel.js";

/**
 * @swagger
 * /api/businesses/{id}:
 *  put:
 *    description: Update an existing business
 *    tags:
 *      - Businesses
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The ID of the business
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
 *        description: Business updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Business'
 *      400:
 *        description: Invalid input
 *      404:
 *        description: Business not found
 *      500:
 *        description: An error occurred while updating the business
 */

const updateBusiness = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  console.log(`Received request to update business with ID: ${id}`);
  console.log(`Update data:`, updateData);

  try {
    console.log(`Looking for business with ID: ${id}`);
    const business = await BusinessModel.findById(id);
    if (!business) {
      console.error(`Business with ID: ${id} not found`);
      return res.status(404).json({ error: "Business not found" });
    }

    console.log(`Found business:`, business);
    Object.keys(updateData).forEach((key) => {
      console.log(`Updating ${key} to ${updateData[key]}`);
      business[key] = updateData[key];
    });

    console.log(`Saving updated business`);
    const updatedBusiness = await business.save();
    console.log(`Business updated successfully:`, updatedBusiness);
    res.status(200).json(updatedBusiness);
  } catch (err) {
    console.error(
      `An error occurred while updating the business with ID: ${id}`,
      err.message
    );
    res
      .status(500)
      .json({ error: "An error occurred while updating the business" });
  }
};

export default updateBusiness;
