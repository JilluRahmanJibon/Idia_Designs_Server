"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioServices = void 0;
const portfolio_model_1 = require("./portfolio.model");
const getPortfolioInToDB = async () => {
    const result = await portfolio_model_1.Portfolio.find({}, "title picture");
    return result;
};
const getSinglePortfolioInToDB = async (id) => {
    const result = await portfolio_model_1.Portfolio.findById(id);
    return result;
};
exports.PortfolioServices = { getPortfolioInToDB, getSinglePortfolioInToDB };
