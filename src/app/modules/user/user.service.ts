import config from "../../config";
import AppError from "../../errors/AppError";
import { createToken } from "../auth/auth.utils";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUserInToDB = async (payload: IUser) => {
	// Check if the user already exists
	const existingUser = await User.findOne({
		$or: [{ email: payload.email }, { phone: payload.phone }],
	});

	if (existingUser) {
		if (existingUser.email === payload.email) {
			throw new AppError(400, "User with this email already exists!");
		}
		if (existingUser.phone === payload.phone) {
			throw new AppError(400, "User with this phone number already exists!");
		}
	}

	// Create the new user
	await User.create(payload);

	// Prepare JWT payload
	const jwtPayload = {
		userEmail: payload.email,
		role: payload.role,
	};

	// Generate tokens
	const accessToken = createToken(
		jwtPayload,
		config.jwt_access_secret as string,
		config.jwt_access_expires_in as string
	);

	const refreshToken = createToken(
		jwtPayload,
		config.jwt_refresh_secret as string,
		config.jwt_refresh_expires_in as string
	);

	return { accessToken, refreshToken };
};

const getMe = async (email: string, role: string) => {
	let result = null;

	if (role === "user") {
		result = await User.findOne({ email });
	}
	return result;
};

const updateUserInToDB = async (id: string, payload: IUser) => {
	const result = User.findByIdAndUpdate(id, payload, { new: true });
	return result;
};

export const UserServices = {
	createUserInToDB,
	getMe,
	updateUserInToDB,
};
