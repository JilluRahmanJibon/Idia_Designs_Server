"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = require("mongoose");
const CartSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    userEmail: { type: String, required: true, unique: true },
    items: [
        {
            productId: {
                type: mongoose_1.Schema.Types.ObjectId,
                required: true,
                ref: "Portfolio",
            },
            productName: { type: String, required: true },
            price: { type: Number, required: true, min: 0 },
            picture: { type: String, required: true },
        },
    ],
}, { timestamps: true });
exports.Cart = (0, mongoose_1.model)("Cart", CartSchema);
