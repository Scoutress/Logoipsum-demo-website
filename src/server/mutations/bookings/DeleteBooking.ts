import { Request, Response } from "express";
import BookingModel from "../../models/BookingModel.ts";

/**
 * @swagger
 * /bookings/{id}:
 *  delete:
 *    description: Delete a booking by ID
 *    tags:
 *      - Bookings
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The ID of the booking
 *    responses:
 *      200:
 *        description: Booking deleted
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Booking'
 *      404:
 *        description: Booking not found
 *      500:
 *        description: An error occurred while deleting the booking
 */

const deleteBooking = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const booking = await BookingModel.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    return res.status(200).json({ message: "Booking deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the booking" });
  }
};

export default deleteBooking;
