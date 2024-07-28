import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import UserModel, { IUser } from "../../models/UserModel.ts";
import { AuthenticatedRequest } from "../../middleware/AuthMiddleware.ts";

/**
 * @swagger
 * /user/{id}:
 *  put:
 *    summary: Update an existing user
 *    tags:
 *      - Users
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The ID of the user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              city:
 *                type: string
 *              email:
 *                type: string
 *              currentPassword:
 *                type: string
 *              newPassword:
 *                type: string
 *    responses:
 *      200:
 *        description: User updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      400:
 *        description: Invalid input
 *      404:
 *        description: User not found
 *      500:
 *        description: An error occurred while updating the user
 */

const updateUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { currentPassword, newPassword, ...updateData } = req.body;

  try {
    const user: IUser | null = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);

      if (!isMatch) {
        return res.status(400).json({ error: "Incorrect current password" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
    }

    Object.keys(updateData).forEach((key) => {
      (user as any)[key] = updateData[key];
    });

    const updatedUser: IUser = await user.save();
    return res.status(200).json(updatedUser);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "An error occurred while updating the user" });
  }
};

export default updateUser;
