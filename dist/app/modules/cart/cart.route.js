"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRoutes = void 0;
const express_1 = require("express");
const cart_controller_1 = require("./cart.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
router.post('/add', (0, auth_1.default)('user'), cart_controller_1.CartController.addCartItem);
router.get("/items", (0, auth_1.default)("user"), cart_controller_1.CartController.getCartItems);
router.delete('/remove/:id', (0, auth_1.default)('user'), cart_controller_1.CartController.removeCartItem);
exports.CartRoutes = router;
