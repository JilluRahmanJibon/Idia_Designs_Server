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
const addCartItem = (0, catchAsync_1.default)(async (req, res) => {
    const { userEmail } = req.user;
    const data = req.body;
    const result = await cart_service_1.CartService.addCartItemInToDB(data, userEmail);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `This item added to your cart successfully!`,
        data: result,
    });
});
const getCartItems = (0, catchAsync_1.default)(async (req, res) => {
    const { userEmail } = req.user;
    const result = await cart_service_1.CartService.getCartItemsInToDB(userEmail);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `Cart items retrieved successfully!`,
        data: result,
    });
});
const removeCartItem = (0, catchAsync_1.default)(async (req, res) => {
    const { userEmail } = req.user;
    const { id } = req.params;
    const result = await cart_service_1.CartService.removeCartItemInToDB(userEmail, id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `This item delete from you cart!`,
        data: result,
    });
});
exports.CartController = { addCartItem, getCartItems, removeCartItem };
