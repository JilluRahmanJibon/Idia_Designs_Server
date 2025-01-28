import { Router } from "express";
import { CartController } from "./cart.controller";
import auth from "../../middlewares/auth";

const router = Router()

router.post('/add',auth('user'),CartController.addCartItem)
router.get("/items", auth("user"), CartController.getCartItems);
router.delete('/remove/:id',auth('user'),CartController.removeCartItem)


export const CartRoutes = router