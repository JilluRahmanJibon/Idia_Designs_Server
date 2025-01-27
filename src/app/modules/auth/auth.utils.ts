import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export const createToken = (
	jwtPayload: { userEmail: string; role: string },
	secret: string,
	expiresIn: string
) => {
	return jwt.sign(jwtPayload, secret as string, {
		expiresIn: expiresIn as SignOptions["expiresIn"],
	});
};

export const verifyToken = (token: string, secret: string) => {
	return jwt.verify(token, secret) as JwtPayload;
};
