import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *  schemas:
 *    Category:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        id:
 *          type: string
 *          readOnly: true
 *        name:
 *          type: string
 *        iconFile:
 *          type: string
 *          nullable: true
 */

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    iconFile: { type: String, default: "" },
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
