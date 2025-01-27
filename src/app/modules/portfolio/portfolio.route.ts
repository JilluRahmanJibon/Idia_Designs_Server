import { Router } from "express";
import { PortfolioController } from "./portfolio.controller";

const router = Router();

router.get("/", PortfolioController.getPortfolio);
router.get("/:id", PortfolioController.getSinglePortfolio);

export const PortfolioRoutes = router;
