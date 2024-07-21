import { Application } from "express";
import bookingsRouter from "../routers/BookingsRouter.ts";
import businessesRouter from "../routers/BusinessesRouter.ts";
import categoriesRouter from "../routers/CategoriesRouter.ts";
import authRouter from "../routers/AuthRouter.ts";

const configRoutes = (server: Application): void => {
  server.use("/categories", categoriesRouter);
  server.use("/businesses", businessesRouter);
  server.use("/bookings", bookingsRouter);
  server.use("/auth", authRouter);
};

export default configRoutes;
