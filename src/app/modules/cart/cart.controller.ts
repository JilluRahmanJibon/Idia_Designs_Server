import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CartService } from "./cart.service";
import httpStatus from "http-status";

const addToCart = catchAsync(async (req, res) => {
	const data = req.body;

	const result = await CartService.addToCartInToDB(data);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `The ${result.productName} added to your cart!`,
		data: result,
	});
});

export const CartController = { addToCart };
