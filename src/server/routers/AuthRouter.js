import express from "express";
import login from "../auth/queries/Login.js";
import register from "../auth/mutations/register.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

export default router;
