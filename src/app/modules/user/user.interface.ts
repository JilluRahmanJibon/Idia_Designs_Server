import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface IUser {
	userName: string;
	email: string;
	phone: string;
	password: string;
	profileImg?: string;
	role: "superAdmin" | "user";
	status: "in-progress" | "blocked";
	isDeleted: boolean;
}

export interface UserModel extends Model<IUser> {
	// instance methods for checking user exists
	isUserExistsByEmail(email: string): Promise<IUser>;
	isPasswordMatched(
		planTextPassword: string,
		hashedPassword: string
	): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
