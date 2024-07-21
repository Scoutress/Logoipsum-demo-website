import { Request, Response } from "express";
import mongoose from "mongoose";
import moment from "moment";
import BookingModel from "../../models/BookingModel.ts";

/**
 * @swagger
 * /services/{serviceId}/bookings/date/{date}:
 *  get:
 *    summary: Get bookings for a service by date
 *    tags:
 *      - Services
 *    parameters:
 *      - in: path
 *        name: serviceId
 *        schema:
 *          type: string
 *        required: true
 *        description: The ID of the service
 *      - in: path
 *        name: date
 *        schema:
 *          type: string
 *          format: date
 *        required: true
 *        description: The date of the bookings (YYYY-MM-DD)
 *    responses:
 *      200:
 *        description: A list of bookings for the service by date
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Booking'
 *      400:
 *        description: Invalid date format
 *      404:
 *        description: No bookings found for this service on the given date
 *      500:
 *        description: An error occurred while fetching bookings
 */

const getBookingsByServiceAndDate = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { serviceId, date } = req.params;

  if (!moment(date, "YYYY-MM-DD", true).isValid()) {
    res
      .status(400)
      .json({ error: "Invalid date format, should be YYYY-MM-DD" });
    return;
  }

  if (!mongoose.Types.ObjectId.isValid(serviceId)) {
    res.status(400).json({ error: "Invalid service ID format" });
    return;
  }

  try {
    const serviceObjectId = new mongoose.Types.ObjectId(serviceId);

    const bookings = await BookingModel.find({
      serviceID: serviceObjectId,
      date,
    });

    if (bookings.length === 0) {
      res.status(404).json({
        error: "No bookings found for this service on the given date",
      });
      return;
    }

    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching bookings" });
  }
};

export default getBookingsByServiceAndDate;
