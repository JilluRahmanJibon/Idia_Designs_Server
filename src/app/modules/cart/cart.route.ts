import { Router } from "express";
import { CartController } from "./cart.controller";

const router = Router()

router.post('/add-to-cart',CartController.addToCart)


export const CartRoutes = router