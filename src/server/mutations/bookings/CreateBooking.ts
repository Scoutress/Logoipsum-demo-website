import { Request, Response } from "express";
import BookingModel from "../../models/BookingModel.ts";

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

const createBooking = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { serviceID, date, time, userEmail, userName, status } = req.body;

  console.log("Received booking data:", req.body);

  if (!serviceID || !date || !time || !userEmail || !userName || !status) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newBooking = new BookingModel({
      serviceID,
      date,
      time,
      userEmail,
      userName,
      status,
    });

    await newBooking.save();
    return res.status(201).json(newBooking);
  } catch (error) {
    console.error("Error creating booking:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default createBooking;
