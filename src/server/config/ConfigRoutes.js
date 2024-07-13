import bookingsRouter from "../routers/BookingsRouter.js";
import businessesRouter from "../routers/BusinessesRouter.js";
import categoriesRouter from "../routers/CategoriesRouter.js";

const configRoutes = (server) => {
  server.use("/api/categories", categoriesRouter);
  server.use("/api/businesses", businessesRouter);
  server.use("/api/bookings", bookingsRouter);
};

export default configRoutes;
