import { model, Schema } from "mongoose";

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

export interface IBooking extends Document {
  businessID: string;
  date: string;
  time: string;
  userEmail: string;
  userName: string;
  status: string;
}

const bookingSchema = new Schema<IBooking>({
  businessID: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  userEmail: { type: String, required: true },
  userName: { type: String, required: true },
  status: { type: String, required: true },
});

const BookingModel = model<IBooking>("Booking", bookingSchema);
export default BookingModel;
