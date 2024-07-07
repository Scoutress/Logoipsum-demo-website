import express from "express";
import getBusinesses from "../queries/businesses/GetBusinesses.js";
import getBusinessesByCategory from "../queries/businesses/GetBusinessesByCategory.js";
import getBusinessById from "../queries/businesses/GetBusinessById.js";
import createBusiness from "../mutations/businesses/CreateBusiness.js";
import updateBusiness from "../mutations/businesses/UpdateBusiness.js";

const businessesRouter = express.Router();

businessesRouter.get("/", getBusinesses);
businessesRouter.get("/category/:category", getBusinessesByCategory);
businessesRouter.get("/:id", getBusinessById);
businessesRouter.post("/", createBusiness);
businessesRouter.put("/:id", updateBusiness);

export default businessesRouter;
