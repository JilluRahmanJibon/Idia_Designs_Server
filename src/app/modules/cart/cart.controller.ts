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
		message: "PaymentIntent create successfully!",
		data: result,
	});
});

export const CartController = { addToCart };
