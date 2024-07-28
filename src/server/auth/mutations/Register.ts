import { Request, Response } from "express";
import UserModel, { IUser } from "../../models/UserModel.ts";
import formatAuthResponse from "../helpers/FormatAuthResponse.ts";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const register = async (req: Request, res: Response): Promise<Response> => {
  const { id, username, firstName, lastName, city, email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const existingUsername = await UserModel.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser: IUser = new UserModel({
      _id: id,
      username,
      firstName,
      lastName,
      city,
      email,
      password,
    });

    await newUser.save();

    const response = formatAuthResponse(newUser);

    const tokenSecret = process.env.TOKEN_SECRET;
    const tokenExpiration = process.env.TOKEN_EXPIRATION || "1h";

    if (!tokenSecret) {
      throw new Error("JWT secret is not defined in environment variables");
    }
    const token = jwt.sign({ id: newUser._id }, tokenSecret, {
      expiresIn: tokenExpiration,
    });

    return res.status(201).json({ token, user: response });
  } catch (error) {
    console.error("Error registering new user:", error);
    const typedError = error as Error;
    return res.status(500).json({
      message: "Error registering new user.",
      error: typedError.message,
    });
  }
};

export default register;
