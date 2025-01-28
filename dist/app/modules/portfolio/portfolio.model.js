"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Portfolio = void 0;
const mongoose_1 = require("mongoose");
const portfolioSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    picture: { type: String, required: true },
    description: { type: String, required: true },
    service: { type: String, required: true },
    price: { type: String, required: true },
    video: { type: String },
    images: [
        {
            img: { type: String },
        },
    ],
}, {
    timestamps: true,
});
// Create the Mongoose model for the portfolio
exports.Portfolio = (0, mongoose_1.model)("Portfolio", portfolioSchema);
