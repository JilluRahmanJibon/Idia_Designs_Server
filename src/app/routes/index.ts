import { Router } from "express";
import { PortfolioRoutes } from "../modules/portfolio/portfolio.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UserRoutes } from "../modules/user/user.route";
import { PurchaseRoutes } from "../modules/purchase/purchase.route";
import { CartRoutes } from "../modules/cart/cart.route";

const router = Router();

const moduleRoutes = [
	{
		path: "/portfolio",
		route: PortfolioRoutes,
	},
	{
		path: "/users",
		route: UserRoutes,
	},
	{
		path: "/auth",
		route: AuthRoutes,
	},
	{
		path: "/checkout",
		route: PurchaseRoutes,
	},
	{
		path: "/cart",
		route: CartRoutes,
	},
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
