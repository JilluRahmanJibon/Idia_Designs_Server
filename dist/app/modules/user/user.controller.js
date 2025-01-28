"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const user_service_1 = require("./user.service");
const http_status_1 = __importDefault(require("http-status"));
const createUser = (0, catchAsync_1.default)(async (req, res) => {
    const data = req.body;
    const result = await user_service_1.UserServices.createUserInToDB(data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User is created successfully",
        data: result,
    });
});
const getMe = (0, catchAsync_1.default)(async (req, res) => {
    const { userEmail, role } = req.user;
    const result = await user_service_1.UserServices.getMe(userEmail, role);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User is retrieved successfully",
        data: result,
    });
});
const updateUser = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const result = await user_service_1.UserServices.updateUserInToDB(id, data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User is updates successfully",
        data: result,
    });
});
exports.UserControllers = {
    createUser,
    getMe,
    updateUser,
};
