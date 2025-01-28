import { Types } from "mongoose";

export interface ICart {
	userId: Types.ObjectId;
	userEmail: string;
	items: {
		productId: Types.ObjectId;
		productName: string;
		price: number;
		picture: string;
	}[]
}
