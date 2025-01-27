import { Router } from "express";
import { CartController } from "./cart.controller";

const router = Router()

router.post('/',CartController.addToCart)


export const CartRoutes = router