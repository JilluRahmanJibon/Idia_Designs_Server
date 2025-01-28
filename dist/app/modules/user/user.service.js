"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const auth_utils_1 = require("../auth/auth.utils");
const user_model_1 = require("./user.model");
const createUserInToDB = async (payload) => {
    // Check if the user already exists
    const existingUser = await user_model_1.User.findOne({
        $or: [{ email: payload.email }, { phone: payload.phone }],
    });
    if (existingUser) {
        if (existingUser.email === payload.email) {
            throw new AppError_1.default(400, "User with this email already exists!");
        }
        if (existingUser.phone === payload.phone) {
            throw new AppError_1.default(400, "User with this phone number already exists!");
        }
    }
    // Create the new user
    await user_model_1.User.create(payload);
    // Prepare JWT payload
    const jwtPayload = {
        userEmail: payload.email,
        role: payload.role,
    };
    // Generate tokens
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return { accessToken, refreshToken };
};
const getMe = async (email, role) => {
    let result = null;
    if (role === "user") {
        result = await user_model_1.User.findOne({ email });
    }
    return result;
};
const updateUserInToDB = async (id, payload) => {
    const result = user_model_1.User.findByIdAndUpdate(id, payload, { new: true });
    return result;
};
exports.UserServices = {
    createUserInToDB,
    getMe,
    updateUserInToDB,
};
