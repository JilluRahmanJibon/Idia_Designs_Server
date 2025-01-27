import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PortfolioServices } from "./portfolio.service";
import httpStatus from "http-status";

const getPortfolio = catchAsync(async (req, res) => {
	const portfolio = await PortfolioServices.getPortfolioInToDB();
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Portfolios retrieved successfully",
		data: portfolio,
	});
});
const getSinglePortfolio = catchAsync(async (req, res) => {
	const { id } = req.params;
	const portfolio = await PortfolioServices.getSinglePortfolioInToDB(id);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Portfolio retrieved successfully",
		data: portfolio,
	});
});

export const PortfolioController = { getPortfolio, getSinglePortfolio };
