import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { ICart } from "./cart.interface";
import { Cart } from "./cart.model";

const addCartItemInToDB = async (payload: ICart["items"][0], email: string) => {
	// Validate the user exists
	const user = await User.findOne({ email: email });

	if (!user) {
		throw new AppError(
			404,
			"User not found. Please register before adding to the cart."
		);
	}

	// Check if a cart already exists for the user
	const existingCart = await Cart.findOne({ userEmail: email });

	if (existingCart) {
		// Check if the product already exists in the cart
		const productExists = existingCart.items.some(
			item => item.productId.toString() === payload.productId.toString()
		);

		if (productExists) {
			throw new AppError(403, "This product is already in your cart.");
		}

		// Add the new product to the existing cart's items array
		existingCart.items.push({
			productId: payload.productId,
			productName: payload.productName,
			price: payload.price,
			picture: payload.picture,
		});
		await existingCart.save();
		return existingCart;
	} else {
		// Create a new cart for the user if no cart exists
		const newCart = await Cart.create({
			userId: user._id,
			userEmail: email,
			items: [payload],
		});
		return newCart;
	}
};

const getCartItemsInToDB = async (email: string) => {
	try {
		// Fetch the cart for the user
		const cart = await Cart.findOne({ userEmail: email });

		if (!cart) {
			return {
				success: false,
				message: "No cart found for the specified user.",
				items: [],
			};
		}

		return cart;
	} catch (error: unknown) {
		// Handle errors
		if (error instanceof Error) {
			throw new AppError(404, `Failed to add to cart: ${error.message}`);
		}
	}
};

const removeCartItemInToDB = async (email: string, productId: string) => {
	try {
		// Find the cart of the user by email
		const updatedCart = await Cart.findOneAndUpdate(
			{ userEmail: email },
			{ $pull: { items: { productId } } },
			{ new: true }
		);

		if (!updatedCart) {
			throw new Error("Cart not found.");
		}

		return updatedCart;
	} catch (error) {
		console.error("Error removing cart item:", error);
		throw new AppError(402, "Error removing item from cart.");
	}
};

export const CartService = {
	addCartItemInToDB,
	getCartItemsInToDB,
	removeCartItemInToDB,
};
