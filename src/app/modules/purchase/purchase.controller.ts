import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PurchaseService } from "./purchase.service";
import httpStatus from "http-status";

const createPurchase = catchAsync(async (req, res) => {
	const data = req.body;
	const result = await PurchaseService.createPurchaseInToDB(data);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "PaymentIntent create successfully!",
		data: result,
	});
});

export const PurchaseController = { createPurchase };
