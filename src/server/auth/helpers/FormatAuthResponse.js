import generateToken from "../helpers/GenerateToken.js";

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
 *             name:
 *               type: string
 *               description: The user's name
 *             email:
 *               type: string
 *               description: The user's email
 *             age:
 *               type: number
 *               description: The user's age
 *       example:
 *         token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         user:
 *           id: "60d0fe4f5311236168a109ca"
 *           name: "John Doe"
 *           email: "johndoe@example.com"
 *           age: 29
 */
const formatAuthResponse = (userDoc) => {
  const token = generateToken({ id: userDoc._id });
  return {
    token,
    user: {
      id: userDoc._id,
      name: userDoc.name,
      email: userDoc.email,
      age: userDoc.age,
    },
  };
};

export default formatAuthResponse;
