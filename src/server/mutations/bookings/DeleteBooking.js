import BookingModel from "../../models/BookingModel.js";

/**
 * @swagger
 * /api/bookings/{id}:
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

const deleteBooking = async (req, res) => {
  const { id } = req.params;

  console.log(`Received request to delete booking with ID: ${id}`);

  try {
    console.log(`Attempting to delete booking with ID: ${id}`);
    const booking = await BookingModel.findByIdAndDelete(id);

    if (!booking) {
      console.error(`Booking with ID: ${id} not found`);
      return res.status(404).json({ error: "Booking not found" });
    }

    console.log(`Booking with ID: ${id} deleted successfully`);
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (err) {
    console.error(
      `An error occurred while deleting booking with ID: ${id}`,
      err.message
    );
    res
      .status(500)
      .json({ error: "An error occurred while deleting the booking" });
  }
};

export default deleteBooking;
