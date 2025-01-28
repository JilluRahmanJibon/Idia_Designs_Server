"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRoutes = void 0;
const express_1 = require("express");
const cart_controller_1 = require("./cart.controller");
const router = (0, express_1.Router)();
router.post('/', cart_controller_1.CartController.addToCart);
exports.CartRoutes = router;
