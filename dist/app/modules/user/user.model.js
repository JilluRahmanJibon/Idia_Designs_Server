"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    phone: {
        type: String,
        unique: true,
        required: true,
    },
    profileImg: {
        type: String,
        default: null,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["superAdmin", "user"],
        default: "user",
    },
    status: {
        type: String,
        enum: ["in-progress", "blocked"],
        default: "in-progress",
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
UserSchema.pre("save", async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this; // doc
    // hashing password and save into DB
    user.password = await bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
    next();
});
// set '' after saving password
UserSchema.post("save", function (doc, next) {
    doc.password = "";
    next();
});
UserSchema.statics.isUserExistsByEmail = async function (email) {
    return await exports.User.findOne({ email }).select("+password");
};
UserSchema.statics.isPasswordMatched = async function (plainTextPassword, hashedPassword) {
    return await bcrypt_1.default.compare(plainTextPassword, hashedPassword);
};
exports.User = (0, mongoose_1.model)("User", UserSchema);
