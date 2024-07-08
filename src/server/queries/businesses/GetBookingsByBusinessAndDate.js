import BookingModel from "../../models/BookingModel.js";
import mongoose from "mongoose";
import moment from "moment";

/**
 * @swagger
 * /api/businesses/{businessId}/bookings/date/{date}:
 *  get:
 *    summary: Get bookings for a business by date
 *    tags:
 *      - Businesses
 *    parameters:
 *      - in: path
 *        name: businessId
 *        schema:
 *          type: string
 *        required: true
 *        description: The ID of the business
 *      - in: path
 *        name: date
 *        schema:
 *          type: string
 *          format: date
 *        required: true
 *        description: The date of the bookings (YYYY-MM-DD)
 *    responses:
 *      200:
 *        description: A list of bookings for the business by date
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Booking'
 *      404:
 *        description: No bookings found for this business on the given date
 *      500:
 *        description: An error occurred while fetching bookings
 */

const getBookingsByBusinessAndDate = async (req, res) => {
  const { businessId, date } = req.params;

  console.log(
    `Received request to get bookings for business ID: ${businessId} on date: ${date}`
  );

  if (!moment(date, "YYYY-MM-DD", true).isValid()) {
    console.error("Invalid date format:", date);
    return res
      .status(400)
      .json({ error: "Invalid date format, should be YYYY-MM-DD" });
  }
  console.log("Date format is valid:", date);

  try {
    const businessObjectId = new mongoose.Types.ObjectId(businessId);

    const allBookingsOnDate = await BookingModel.find({ date: date });

    const bookings = allBookingsOnDate.filter((booking) =>
      booking.businessID.equals(businessObjectId)
    );
    console.log(
      `Filtered bookings for business ID: ${businessId} on date: ${date}`,
      bookings
    );

    if (bookings.length === 0) {
      console.error(
        `No bookings found for business ID: ${businessId} on date: ${date}`
      );
      return res.status(404).json({
        error: "No bookings found for this business on the given date",
      });
    }

    console.log(
      `Found ${bookings.length} bookings for business ID: ${businessId} on date: ${date}`
    );
    res.status(200).json(bookings);
  } catch (err) {
    console.error(
      `An error occurred while fetching bookings for business ID: ${businessId} on date: ${date}`,
      err.message
    );
    res
      .status(500)
      .json({ error: "An error occurred while fetching bookings" });
  }
};

export default getBookingsByBusinessAndDate;
