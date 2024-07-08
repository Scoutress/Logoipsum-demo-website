import express from "express";
import getBookingsByUserEmail from "../queries/bookings/getBookingsByUserEmail.js";
import createBooking from "../mutations/bookings/CreateBooking.js";
import deleteBooking from "../mutations/bookings/DeleteBooking.js";

const bookingsRouter = express.Router();

bookingsRouter.get("/user/:email", getBookingsByUserEmail);
bookingsRouter.post("/", createBooking);
bookingsRouter.delete("/:id", deleteBooking);

export default bookingsRouter;
