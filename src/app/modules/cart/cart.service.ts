import { ICart } from "./cart.interface"
import { Cart } from "./cart.model"


const addToCartInToDB = async (payload:ICart) => {
    
    const result = await Cart.create(payload)
    return result
}


export const CartService={addToCartInToDB}