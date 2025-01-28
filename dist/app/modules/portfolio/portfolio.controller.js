"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const portfolio_service_1 = require("./portfolio.service");
const http_status_1 = __importDefault(require("http-status"));
const getPortfolio = (0, catchAsync_1.default)(async (req, res) => {
    const portfolio = await portfolio_service_1.PortfolioServices.getPortfolioInToDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Portfolios retrieved successfully",
        data: portfolio,
    });
});
const getSinglePortfolio = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const portfolio = await portfolio_service_1.PortfolioServices.getSinglePortfolioInToDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Portfolio retrieved successfully",
        data: portfolio,
    });
});
exports.PortfolioController = { getPortfolio, getSinglePortfolio };
