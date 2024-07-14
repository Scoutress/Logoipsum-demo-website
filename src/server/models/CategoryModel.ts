import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *  schemas:
 *    Category:
 *      type: object
 *      required:
 *        - name
 *        - backgroundColor
 *        - photo
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        backgroundColor:
 *          type: string
 *        photo:
 *          type: string
 */

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    backgroundColor: { type: String, required: true },
    photo: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

categorySchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

const CategoryModel = mongoose.model("Category", categorySchema);

export default CategoryModel;
