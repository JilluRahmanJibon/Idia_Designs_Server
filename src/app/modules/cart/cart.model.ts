import  { model, Schema } from "mongoose";
import { ICart } from "./cart.interface";

const CartSchema = new Schema<ICart>(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User" },
		userEmail: { type: String, required: true },
		productId: { type: Schema.Types.ObjectId, required: true },
		productName: { type: String, required: true },
		price: { type: Number, required: true, min: 0 },
		picture: { type: String, required: true },
	},
	{ timestamps: true }
);

// Mongoose model creation
export const Cart = model<ICart>("Cart", CartSchema);
