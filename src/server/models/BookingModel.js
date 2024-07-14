import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *  schemas:
 *    Booking:
 *      type: object
 *      required:
 *        - businessID
 *        - date
 *        - time
 *        - userEmail
 *        - userName
 *        - status
 *      properties:
 *        id:
 *          type: string
 *        businessID:
 *          type: string
 *        date:
 *          type: string
 *        time:
 *          type: string
 *        userEmail:
 *          type: string
 *        userName:
 *          type: string
 *        status:
 *          type: string
 */

const BookingSchema = new mongoose.Schema({
  businessID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const BookingModel = mongoose.model("Booking", BookingSchema);

export default BookingModel;
