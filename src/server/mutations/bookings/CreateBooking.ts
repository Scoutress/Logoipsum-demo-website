import { Request, Response } from "express";
import moment from "moment";
import BookingModel, { IBooking } from "../../models/BookingModel.ts";
import ServiceModel from "../../models/ServiceModel.ts";
import validate from "../../middleware/ValidationMiddleware.ts";
import { bookingSchema } from "../../Schemas.ts";

/**
 * @swagger
 * /bookings:
 *  post:
 *    description: Create a new booking
 *    tags:
 *      - Bookings
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - serviceID
 *              - date
 *              - time
 *              - userEmail
 *              - userName
 *              - status
 *            properties:
 *              serviceID:
 *                type: string
 *              date:
 *                type: string
 *              time:
 *                type: string
 *              userEmail:
 *                type: string
 *              userName:
 *                type: string
 *              status:
 *                type: string
 *    responses:
 *      201:
 *        description: Booking created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Booking'
 *      400:
 *        description: Invalid input
 *      500:
 *        description: An error occurred while creating the booking
 */

const createBooking = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { serviceID, date, time, userEmail, userName, status } = req.body;

  if (!moment(date, "YYYY-MM-DD", true).isValid()) {
    return res
      .status(400)
      .json({ error: "Invalid date format, should be YYYY-MM-DD" });
  }

  try {
    const service = await ServiceModel.findById(serviceID);
    if (!service) {
      return res
        .status(400)
        .json({ error: "Service with this ID does not exist" });
    }

    const newBooking: IBooking = await BookingModel.create({
      serviceID: serviceID,
      date,
      time,
      userEmail,
      userName,
      status,
    });
    return res.status(201).json(newBooking);
  } catch (err) {
    console.error("Error creating booking:", err);
    return res
      .status(500)
      .json({ error: "An error occurred while creating the booking" });
  }
};

export default [validate(bookingSchema), createBooking];
