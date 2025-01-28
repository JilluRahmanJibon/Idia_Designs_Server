import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CartService } from "./cart.service";
import httpStatus from "http-status";

const addCartItem = catchAsync(async (req, res) => {
	const { userEmail } = req.user;
	const data = req.body;

	const result = await CartService.addCartItemInToDB(data, userEmail);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `This item added to your cart successfully!`,
		data: result,
	});
});

const getCartItems = catchAsync(async (req, res) => {
	const { userEmail } = req.user;

	const result = await CartService.getCartItemsInToDB(userEmail);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `Cart items retrieved successfully!`,
		data: result,
	});
});

const removeCartItem= catchAsync(async (req, res) => {
	const { userEmail } = req.user;
	const {id}=req.params

	const result = await CartService.removeCartItemInToDB(userEmail,id);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `This item delete from you cart!`,
		data: result,
	});
});

export const CartController = { addCartItem, getCartItems ,removeCartItem};
