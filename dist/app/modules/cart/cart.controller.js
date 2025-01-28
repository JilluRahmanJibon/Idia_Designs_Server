"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const cart_service_1 = require("./cart.service");
const http_status_1 = __importDefault(require("http-status"));
const addToCart = (0, catchAsync_1.default)(async (req, res) => {
    const data = req.body;
    const result = await cart_service_1.CartService.addToCartInToDB(data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "PaymentIntent create successfully!",
        data: result,
    });
});
exports.CartController = { addToCart };
