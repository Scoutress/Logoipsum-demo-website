import BookingModel from "../../models/BookingModel.js";

/**
 * @swagger
 * /api/bookings/user/{email}:
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

const getBookingsByUserEmail = async (req, res) => {
  const { email } = req.params;

  console.log(`Received request to get bookings for user with email: ${email}`);

  try {
    console.log(`Querying bookings for user with email: ${email}`);
    const bookings = await BookingModel.find({ userEmail: email });

    if (bookings.length === 0) {
      console.error(`No bookings found for user with email: ${email}`);
      return res.status(404).json({
        error: "No bookings found for this user",
      });
    }

    console.log(
      `Found ${bookings.length} bookings for user with email: ${email}`
    );
    res.status(200).json(bookings);
  } catch (err) {
    console.error(
      `An error occurred while fetching bookings for user with email: ${email}`,
      err.message
    );
    res
      .status(500)
      .json({ error: "An error occurred while fetching bookings" });
  }
};

export default getBookingsByUserEmail;
