"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioRoutes = void 0;
const express_1 = require("express");
const portfolio_controller_1 = require("./portfolio.controller");
const router = (0, express_1.Router)();
router.get("/", portfolio_controller_1.PortfolioController.getPortfolio);
router.get("/:id", portfolio_controller_1.PortfolioController.getSinglePortfolio);
exports.PortfolioRoutes = router;
