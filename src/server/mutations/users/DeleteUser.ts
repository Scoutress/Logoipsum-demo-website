import { Request, Response } from "express";
import UserModel from "../../models/UserModel.ts";
import { AuthenticatedRequest } from "../../middleware/AuthMiddleware.ts";

/**
 * @swagger
 * /user/{id}:
 *  delete:
 *    summary: Delete a user
 *    tags:
 *      - Users
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The ID of the user
 *    responses:
 *      200:
 *        description: User deleted
 *      404:
 *        description: User not found
 *      500:
 *        description: An error occurred while deleting the user
 */
const deleteUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const user = await UserModel.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error:", err);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the user" });
  }
};

export default deleteUser;
