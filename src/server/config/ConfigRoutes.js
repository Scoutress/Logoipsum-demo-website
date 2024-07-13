import bookingsRouter from "../routers/BookingsRouter.js";
import businessesRouter from "../routers/BusinessesRouter.js";
import categoriesRouter from "../routers/CategoriesRouter.js";
import authRouter from "../routers/AuthRouter.js";

const configRoutes = (server) => {
  server.use("/categories", categoriesRouter);
  server.use("/businesses", businessesRouter);
  server.use("/bookings", bookingsRouter);
  server.use("/auth", authRouter);
};

export default configRoutes;
