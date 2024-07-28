import { Document, model, Schema } from "mongoose";

/**
 * @swagger
 * components:
 *  schemas:
 *    Service:
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

export interface IService extends Document {
  name: string;
  description: string;
  address: string;
  category: string;
  contactPerson: string;
  email: string;
  photo: string;
}

const serviceSchema = new Schema<IService>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  category: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true },
  photo: { type: String, required: true },
});

const ServiceModel = model<IService>("Service", serviceSchema);
export default ServiceModel;
