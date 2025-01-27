import { Router } from "express";
import { PurchaseController } from "./purchase.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post("/create-payment", auth("user"), PurchaseController.createPurchase);

export const PurchaseRoutes = router;
