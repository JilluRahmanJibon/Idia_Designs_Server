import { model, Schema } from "mongoose";
import { ICart } from "./cart.interface";

const CartSchema = new Schema<ICart>(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
		userEmail: { type: String, required: true ,unique:true},
		items: [
			{
				productId: {
					type: Schema.Types.ObjectId,
					required: true,
					ref: "Portfolio",
				},
				productName: { type: String, required: true },
				price: { type: Number, required: true, min: 0 },
				picture: { type: String, required: true },
			},
		],
	},
	{ timestamps: true }
);

export const Cart = model<ICart>("Cart", CartSchema);
