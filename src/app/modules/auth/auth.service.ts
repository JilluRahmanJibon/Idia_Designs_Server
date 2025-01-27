import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { ILoginUser } from "./auth.interface";
import httpStatus from "http-status";
import { createToken } from "./auth.utils";
import config from "../../config";

const loginUser = async (payload: ILoginUser) => {
	// checking if the user is exist
	const user = await User.isUserExistsByEmail(payload.email);

	if (!user) {
		throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
	}
	// checking if the user is already deleted

	const isDeleted = user?.isDeleted;

	if (isDeleted) {
		throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
	}

	const userStatus = user?.status;

	if (userStatus === "blocked") {
		throw new AppError(httpStatus.FORBIDDEN, "This user is blocked ! !");
	}

	//checking if the password is correct

	if (!(await User.isPasswordMatched(payload?.password, user?.password)))
		throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");

	//create token and sent to the  client

	const jwtPayload = {
		userEmail: user.email,
		role: user.role,
	};

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

	return {
		accessToken,
		refreshToken,
	};
};

export const AuthServices = { loginUser };
