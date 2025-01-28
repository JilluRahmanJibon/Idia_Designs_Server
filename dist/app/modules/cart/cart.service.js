"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const cart_model_1 = require("./cart.model");
const addToCartInToDB = async (payload) => {
    const result = await cart_model_1.Cart.create(payload);
    return result;
};
exports.CartService = { addToCartInToDB };
