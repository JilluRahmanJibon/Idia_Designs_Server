"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseRoutes = void 0;
const express_1 = require("express");
const purchase_controller_1 = require("./purchase.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
router.post("/create-payment", (0, auth_1.default)("user"), purchase_controller_1.PurchaseController.createPurchase);
exports.PurchaseRoutes = router;
