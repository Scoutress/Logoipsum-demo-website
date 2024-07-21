import { Request, Response } from "express";
import UserModel, { IUser } from "../../models/UserModel.ts";
import formatAuthResponse from "../helpers/FormatAuthResponse.ts";

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - firstName
 *               - lastName
 *               - city
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username
 *                 example: johndoe
 *               firstName:
 *                 type: string
 *                 description: The user's first name
 *                 example: John
 *               lastName:
 *                 type: string
 *                 description: The user's last name
 *                 example: Doe
 *               city:
 *                 type: string
 *                 description: The user's city
 *                 example: New York
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: password123
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token
 *                 user:
 *                   $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User already exists
 *       500:
 *         description: Error registering new user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error registering new user.
 *                 error:
 *                   type: string
 *                   example: error.message
 */

const register = async (req: Request, res: Response): Promise<Response> => {
  const { username, firstName, lastName, city, email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser: IUser = new UserModel({
      username,
      firstName,
      lastName,
      city,
      email,
      password,
    });

    await newUser.save();

    const response = formatAuthResponse(newUser);

    return res.status(201).json(response);
  } catch (error) {
    console.error("Error registering new user:", error);
    const typedError = error as Error;
    return res.status(500).json({
      message: "Error registering new user.",
      error: typedError.message,
    });
  }
};

export default register;
