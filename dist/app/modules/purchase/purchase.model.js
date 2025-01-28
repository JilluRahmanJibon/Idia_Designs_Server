"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Purchase = void 0;
const mongoose_1 = require("mongoose");
const PurchaseSchema = new mongoose_1.Schema({
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
exports.Purchase = (0, mongoose_1.model)("Purchase", PurchaseSchema);
