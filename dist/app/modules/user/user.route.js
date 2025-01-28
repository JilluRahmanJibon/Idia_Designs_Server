"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
router.post("/register", user_controller_1.UserControllers.createUser);
router.get("/me", (0, auth_1.default)("user"), user_controller_1.UserControllers.getMe);
router.post("/:id", (0, auth_1.default)("user"), user_controller_1.UserControllers.updateUser);
exports.UserRoutes = router;
