import express from "express";
import getCategories from "../queries/categories/GetCategories.js";
import createCategory from "../mutations/categories/CreateCategory.js";

const categoriesRouter = express.Router();

categoriesRouter.get("/", getCategories);
categoriesRouter.post("/", createCategory);

export default categoriesRouter;
