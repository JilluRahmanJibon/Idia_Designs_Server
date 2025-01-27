import { model, Schema } from "mongoose";
import { IPurchase } from "./purchase.interface";

const PurchaseSchema = new Schema<IPurchase>({
	userEmail: { type: String, required: true },
	userName: { type: String, required: true },
	productId: { type: String, required: true },
	productName: { type: String, required: true },
	price: { type: Number, required: true },
	status: {
		type: String,
		enum: ["pending", "succeeded", "failed"],
		required: true,
		default: "pending",
	},
	paymentIntentId: { type: String, required: true },
	paymentMethodId: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
});

export const Purchase = model<IPurchase>("Purchase", PurchaseSchema);
