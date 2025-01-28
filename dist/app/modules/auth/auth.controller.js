"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllers = void 0;
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const auth_service_1 = require("./auth.service");
const http_status_1 = __importDefault(require("http-status"));
const loginUser = (0, catchAsync_1.default)(async (req, res) => {
    const result = await auth_service_1.AuthServices.loginUser(req.body);
    const { refreshToken, accessToken } = result;
    res.cookie("refreshToken", refreshToken, {
        secure: config_1.default.NODE_ENV === "production",
        httpOnly: true,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User is logged in successfully!",
        data: {
            accessToken,
        },
    });
});
exports.AuthControllers = { loginUser };
