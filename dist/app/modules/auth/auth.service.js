"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const http_status_1 = __importDefault(require("http-status"));
const auth_utils_1 = require("./auth.utils");
const config_1 = __importDefault(require("../../config"));
const loginUser = async (payload) => {
    // checking if the user is exist
    const user = await user_model_1.User.isUserExistsByEmail(payload.email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
    }
    // checking if the user is already deleted
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This user is deleted !");
    }
    const userStatus = user?.status;
    if (userStatus === "blocked") {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This user is blocked ! !");
    }
    //checking if the password is correct
    if (!(await user_model_1.User.isPasswordMatched(payload?.password, user?.password)))
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Password do not matched");
    //create token and sent to the  client
    const jwtPayload = {
        userEmail: user.email,
        role: user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
};
exports.AuthServices = { loginUser };
