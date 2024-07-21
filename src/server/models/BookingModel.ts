import { model, Schema } from "mongoose";

/**
 * @swagger
 * components:
 *  schemas:
 *    Booking:
 *      type: object
 *      required:
 *        - serviceID
 *        - date
 *        - time
 *        - userEmail
 *        - userName
 *        - status
 *      properties:
 *        id:
 *          type: string
 *        serviceID:
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
  serviceID: string;
  date: string;
  time: string;
  userEmail: string;
  userName: string;
  status: string;
}

const bookingSchema = new Schema<IBooking>({
  serviceID: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  userEmail: { type: String, required: true },
  userName: { type: String, required: true },
  status: { type: String, required: true },
});

const BookingModel = model<IBooking>("Booking", bookingSchema);
export default BookingModel;
