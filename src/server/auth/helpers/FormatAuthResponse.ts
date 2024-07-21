import generateToken from "./GenerateToken.ts";
import { IUser } from "../../models/UserModel.ts";

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: The JWT token
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: The user's ID
 *             username:
 *               type: string
 *               description: The user's username
 *             firstName:
 *               type: string
 *               description: The user's first name
 *             lastName:
 *               type: string
 *               description: The user's last name
 *             city:
 *               type: string
 *               description: The user's city
 *             email:
 *               type: string
 *               description: The user's email
 *       example:
 *         token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         user:
 *           id: "60d0fe4f5311236168a109ca"
 *           username: "johndoe"
 *           firstName: "John"
 *           lastName: "Doe"
 *           city: "New York"
 *           email: "johndoe@example.com"
 */

interface FormattedUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  city: string;
  email: string;
}

const formatAuthResponse = (user: IUser): FormattedUser => {
  return {
    id: user._id as string,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    city: user.city,
    email: user.email,
  };
};

export default formatAuthResponse;
