import express from "express";
import getBookingsByUserEmail from "../queries/bookings/GetBookingsByUserEmail.ts";
import createBooking from "../mutations/bookings/CreateBooking.ts";
import deleteBooking from "../mutations/bookings/DeleteBooking.ts";
import authMiddleware from "../middleware/AuthMiddleware.ts";

const bookingsRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: API to manage bookings.
 */

/**
 * @swagger
 * /bookings/user/{email}:
 *   get:
 *     summary: Get bookings by user email
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of bookings by user email
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: Booking created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     summary: Delete a booking by ID
 *     tags: [Bookings]
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
 *         description: Booking deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       404:
 *         description: Booking not found
 */

bookingsRouter.get("/user/:email", authMiddleware, getBookingsByUserEmail);
bookingsRouter.post("/", authMiddleware, createBooking);
bookingsRouter.delete("/:id", authMiddleware, deleteBooking);

export default bookingsRouter;
