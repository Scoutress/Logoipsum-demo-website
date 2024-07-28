import { Response } from "express";
import UserModel, { IUser } from "../../models/UserModel.ts";
import { AuthenticatedRequest } from "../../middleware/AuthMiddleware.ts";

/**
 * @swagger
 * /user/current:
 *  get:
 *    summary: Get the current user
 *    tags:
 *      - Users
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: A user object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: User not found
 *      500:
 *        description: An error occurred while fetching the user
 */
const getCurrentUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const userId = req.currentUser?.id;

  try {
    const user: IUser | null = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the user" });
  }
};

export default getCurrentUser;
