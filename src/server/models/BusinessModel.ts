import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *  schemas:
 *    Business:
 *      type: object
 *      required:
 *        - name
 *        - description
 *        - address
 *        - category
 *        - contactPerson
 *        - email
 *        - photo
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        description:
 *          type: string
 *        address:
 *          type: string
 *        category:
 *          type: string
 *        contactPerson:
 *          type: string
 *        email:
 *          type: string
 *        photo:
 *          type: string
 */

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  category: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true },
  photo: { type: String, required: true },
});

businessSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const BusinessModel = mongoose.model("Business", businessSchema);

export default BusinessModel;
