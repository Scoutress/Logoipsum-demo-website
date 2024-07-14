import formatAuthResponse from "../helpers/FormatAuthResponse.js";
import UserModel from "../../models/UserModel.js";

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
 *               - firstname
 *               - lastname
 *               - city
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username
 *                 example: johndoe
 *               firstname:
 *                 type: string
 *                 description: The user's first name
 *                 example: John
 *               lastname:
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
const register = async (req, res) => {
  try {
    const user = req.body;
    const existingUser = await UserModel.findOne({ email: user.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new UserModel(user);
    await newUser.save();
    return res.status(201).json(formatAuthResponse(newUser));
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error registering new user.", error: error.message });
  }
};

export default register;
