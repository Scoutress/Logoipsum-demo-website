import { Request, Response } from "express";
import BookingModel from "../../models/BookingModel.ts";

/**
 * @swagger
 * /bookings/user/{email}:
 *  get:
 *    description: Get all bookings for a user by email
 *    tags:
 *      - Bookings
 *    parameters:
 *      - in: path
 *        name: email
 *        schema:
 *          type: string
 *        required: true
 *        description: The email of the user
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Booking'
 *      404:
 *        description: No bookings found for this user
 *      500:
 *        description: An error occurred while fetching bookings
 */

const getBookingsByUserEmail = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email } = req.params;

  try {
    const bookings = await BookingModel.find({ userEmail: email }).exec();

    if (bookings.length === 0) {
      return res.status(404).json({
        error: "No bookings found for this user",
      });
    }

    return res.status(200).json(bookings);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "An error occurred while fetching bookings" });
  }
};

export default getBookingsByUserEmail;
