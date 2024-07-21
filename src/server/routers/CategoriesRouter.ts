import express from "express";
import getCategories from "../queries/categories/GetCategories.ts";
import createCategory from "../mutations/categories/CreateCategory.ts";
import authMiddleware from "../middleware/AuthMiddleware.ts";

const categoriesRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API to manage categories.
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Category created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       401:
 *         description: Unauthorized
 */

categoriesRouter.get("/", authMiddleware, getCategories);
categoriesRouter.post("/", authMiddleware, createCategory);

export default categoriesRouter;
