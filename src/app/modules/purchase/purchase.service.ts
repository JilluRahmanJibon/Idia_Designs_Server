import Stripe from "stripe";
// import AppError from "../../errors/AppError";
// import { IPurchase } from "./purchase.interface";
// import { Purchase } from "./purchase.model";

// Stripe instance
const stripe = new Stripe(
	"sk_test_51M7FJQL2FwZDV4iNFJIeF7g5Dqr9dkvfYSDLBbLoqZyrbTafXngdVI7mva95NTdPz1cniUlSj4ElLdXJ67ewoCEI00wOW6hr1E"
);

// Function to create a purchase in DB after successful payment
const createPurchaseInToDB = async (totalAmount:number) => {
	const amount = totalAmount * 100;

	const paymentIntent = await stripe.paymentIntents.create({
		amount: amount,
		currency: "usd",
		payment_method_types: ["card"],
	});

	return { clientSecret: paymentIntent.client_secret };
};

export const PurchaseService = { createPurchaseInToDB };
	// const {
	// 	// userEmail,
	// 	// userName,
	// 	// productId,
	// 	// productName,
	// 	totalAmount,
	// 	// paymentMethodId,
	// } = payload;

	// if (
	// 	!userEmail ||
	// 	!userName ||
	// 	!productId ||
	// 	!productName ||
	// 	!price ||
	// 	!paymentMethodId
	// ) {
	// 	throw new AppError(400, "All fields are required!");
	// }

	// Create a payment intent with Stripe
	// let paymentStatus: "pending" | "succeeded" | "failed" = "failed"; // Default status is failed
// try {
	// 	const paymentIntent = await stripe.paymentIntents.create({
	// 		amount: price,
	// 		currency: "usd",
	// 		payment_method_types: ['card'],
	// 	});

	// 	// Update payment status based on Stripe response
	// 	if (paymentIntent.status === "succeeded") {
	// 		paymentStatus = "succeeded"; // Payment was successful
	// 	} else if (paymentIntent.status === "requires_action") {
	// 		paymentStatus = "pending"; // Payment requires further action, e.g., 3D Secure
	// 	}
	// } catch (error) {
	// 	console.log("🚀 ~ createPurchaseInToDB ~ error:", error);
	// 	// Handle payment intent creation failure (e.g., network error, invalid payment method)
	// 	throw new AppError(500, "Payment processing failed. Please try again.");
	// }

	// Store the purchase in the database after processing the payment
	// const purchase = await Purchase.create({
	// 	...payload,
	// 	status: paymentStatus, // Update the status based on Stripe's response
	// });