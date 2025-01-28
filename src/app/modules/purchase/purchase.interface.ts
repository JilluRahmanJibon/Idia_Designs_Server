import { Types } from "mongoose";

export interface IPurchase {
	userEmail: string;
	userName: string;
	productId: string;
	productName: string;
	price: number;
	status: "pending" | "succeeded" | "failed"; 
	paymentIntentId: string;
	paymentMethodId: string;
	createdAt: Date;
}

export interface IOrder {
	orderId: Types.ObjectId; // Unique identifier for the order
	userId: Types.ObjectId; // Reference to the user
	userEmail: string; // Email of the user
	products: Array<{
		productId: Types.ObjectId; // Reference to the product
		productName: string; // Name of the product
		price: number; // Price at the time of purchase
		picture: string; // Product image
		quantity: number; // Quantity purchased
	}>;
	totalPrice: number; // Total price of the order
	createdAt: Date; // Timestamp for order creation
	status: string; // Order status (e.g., "Pending", "Completed", "Cancelled")
}
