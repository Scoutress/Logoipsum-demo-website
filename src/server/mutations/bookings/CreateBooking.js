import BookingModel from "../../models/BookingModel.js";
import BusinessModel from "../../models/BusinessModel.js";
import moment from "moment";
import validate from "../../middleware/ValidationMiddleware.js";
import { bookingSchema } from "../../schemas.js";

/**
 * @swagger
 * /api/bookings:
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
 *              - businessID
 *              - date
 *              - time
 *              - userEmail
 *              - userName
 *              - status
 *            properties:
 *              businessID:
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

const createBooking = async (req, res) => {
  const { businessID, date, time, userEmail, userName, status } = req.body;

  if (!moment(date, "YYYY-MM-DD", true).isValid()) {
    return res
      .status(400)
      .json({ error: "Invalid date format, should be YYYY-MM-DD" });
  }

  try {
    const business = await BusinessModel.findById(businessID);
    if (!business) {
      return res
        .status(400)
        .json({ error: "Business with this ID does not exist" });
    }

    const newBooking = await BookingModel.create({
      businessID,
      date,
      time,
      userEmail,
      userName,
      status,
    });
    return res.status(201).json(newBooking);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "An error occurred while creating the booking" });
  }
};

export default [validate(bookingSchema), createBooking];
