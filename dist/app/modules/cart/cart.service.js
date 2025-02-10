"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const cart_model_1 = require("./cart.model");
const addCartItemInToDB = async (payload, email) => {
    // Validate the user exists
    const user = await user_model_1.User.findOne({ email: email });
    if (!user) {
        throw new AppError_1.default(404, "User not found. Please register before adding to the cart.");
    }
    // Check if a cart already exists for the user
    const existingCart = await cart_model_1.Cart.findOne({ userEmail: email });
    if (existingCart) {
        // Check if the product already exists in the cart
        const productExists = existingCart.items.some(item => item.productId.toString() === payload.productId.toString());
        if (productExists) {
            throw new AppError_1.default(403, "This product is already in your cart.");
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
    }
    else {
        // Create a new cart for the user if no cart exists
        const newCart = await cart_model_1.Cart.create({
            userId: user._id,
            userEmail: email,
            items: [payload],
        });
        return newCart;
    }
};
const getCartItemsInToDB = async (email) => {
    try {
        // Fetch the cart for the user
        const cart = await cart_model_1.Cart.findOne({ userEmail: email });
        if (!cart) {
            return {
                success: false,
                message: "No cart found for the specified user.",
                items: [],
            };
        }
        return cart;
    }
    catch (error) {
        // Handle errors
        if (error instanceof Error) {
            throw new AppError_1.default(404, `Failed to add to cart: ${error.message}`);
        }
    }
};
const removeCartItemInToDB = async (email, productId) => {
    try {
        // Find the cart of the user by email
        const updatedCart = await cart_model_1.Cart.findOneAndUpdate({ userEmail: email }, { $pull: { items: { productId } } }, { new: true });
        if (!updatedCart) {
            throw new Error("Cart not found.");
        }
        return updatedCart;
    }
    catch (error) {
        console.error("Error removing cart item:", error);
        throw new AppError_1.default(402, "Error removing item from cart.");
    }
};
exports.CartService = {
    addCartItemInToDB,
    getCartItemsInToDB,
    removeCartItemInToDB,
};
