import express from "express";
import getBusinesses from "../queries/businesses/GetBusinesses.ts";
import getBusinessesByCategory from "../queries/businesses/GetBusinessesByCategory.ts";
import getBusinessById from "../queries/businesses/GetBusinessById.ts";
import createBusiness from "../mutations/businesses/CreateBusiness.ts";
import updateBusiness from "../mutations/businesses/UpdateBusiness.ts";
import getBookingsByBusinessAndDate from "../queries/businesses/GetBookingsByBusinessAndDate.ts";
import authMiddleware from "../middleware/AuthMiddleware.ts";

const businessesRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Businesses
 *   description: API to manage businesses.
 */

/**
 * @swagger
 * /businesses:
 *   get:
 *     summary: Get all businesses
 *     tags: [Businesses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of businesses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Business'
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Create a new business
 *     tags: [Businesses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Business'
 *     responses:
 *       201:
 *         description: Business created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Business'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /businesses/category/{category}:
 *   get:
 *     summary: Get businesses by category
 *     tags: [Businesses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of businesses by category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Business'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /businesses/{id}:
 *   get:
 *     summary: Get a business by ID
 *     tags: [Businesses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A business object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Business'
 *       404:
 *         description: Business not found
 *   put:
 *     summary: Update a business by ID
 *     tags: [Businesses]
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
 *             $ref: '#/components/schemas/Business'
 *     responses:
 *       200:
 *         description: Business updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Business'
 *       404:
 *         description: Business not found
 */

/**
 * @swagger
 * /businesses/{businessId}/bookings/date/{date}:
 *   get:
 *     summary: Get bookings for a business by date
 *     tags: [Businesses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: businessId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: A list of bookings for the business by date
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Unauthorized
 */

businessesRouter.get("/", authMiddleware, getBusinesses);
businessesRouter.get(
  "/category/:category",
  authMiddleware,
  getBusinessesByCategory
);
businessesRouter.get("/:id", authMiddleware, getBusinessById);
businessesRouter.post("/", authMiddleware, createBusiness);
businessesRouter.put("/:id", authMiddleware, updateBusiness);
businessesRouter.get(
  "/:businessId/bookings/date/:date",
  authMiddleware,
  getBookingsByBusinessAndDate
);

export default businessesRouter;
