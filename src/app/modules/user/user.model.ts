import { model, Schema } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";

const UserSchema = new Schema<IUser, UserModel>(
	{
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
	},
	{
		timestamps: true,
	}
);

UserSchema.pre("save", async function (next) {
	// eslint-disable-next-line @typescript-eslint/no-this-alias
	const user = this; // doc
	// hashing password and save into DB

	user.password = await bcrypt.hash(
		user.password,
		Number(config.bcrypt_salt_rounds)
	);

	next();
});

// set '' after saving password
UserSchema.post("save", function (doc, next) {
	doc.password = "";
	next();
});

UserSchema.statics.isUserExistsByEmail = async function (email: string) {
	return await User.findOne({ email }).select("+password");
};

UserSchema.statics.isPasswordMatched = async function (
	plainTextPassword,
	hashedPassword
) {
	return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<IUser, UserModel>("User", UserSchema);
