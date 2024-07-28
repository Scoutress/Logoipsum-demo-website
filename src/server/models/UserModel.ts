import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - firstName
 *         - lastName
 *         - city
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         firstName:
 *           type: string
 *           description: The first name of the user
 *         lastName:
 *           type: string
 *           description: The last name of the user
 *         city:
 *           type: string
 *           description: The city of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The hashed password of the user
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the user was last updated
 *       example:
 *         id: d5fE_asz
 *         username: johndoe
 *         firstName: John
 *         lastName: Doe
 *         city: New York
 *         email: johndoe@example.com
 *         password: $2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36z4zN7jTOG2JbG6eU0t1Wy
 *         createdAt: 2023-07-08T14:21:00Z
 *         updatedAt: 2023-07-08T14:21:00Z
 */

export interface IUser extends Document {
  username: string;
  firstName: string;
  lastName: string;
  city: string;
  email: string;
  password: string;
  isCorrectPassword(password: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    city: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.password;
    return ret;
  },
});

const UserModel = mongoose.model<IUser>("User", userSchema);
export default UserModel;
