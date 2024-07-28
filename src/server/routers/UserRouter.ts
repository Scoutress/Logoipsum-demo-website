import express from "express";
import authMiddleware from "../middleware/AuthMiddleware.ts";
import getCurrentUser from "../queries/users/GetCurrentUser.ts";
import updateUser from "../mutations/users/UpdateUser.ts";
import deleteUser from "../mutations/users/DeleteUser.ts";

const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API to manage users.
 */

/**
 * @swagger
 * /user/current:
 *   get:
 *     summary: Get the current user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update an existing user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 *       500:
 *         description: An error occurred while updating the user
 */

userRouter.get("/current", authMiddleware, getCurrentUser);
userRouter.put("/:id", authMiddleware, updateUser);
userRouter.delete("/:id", authMiddleware, deleteUser);

export default userRouter;
