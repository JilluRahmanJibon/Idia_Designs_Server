"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const portfolio_route_1 = require("../modules/portfolio/portfolio.route");
const auth_route_1 = require("../modules/auth/auth.route");
const user_route_1 = require("../modules/user/user.route");
const purchase_route_1 = require("../modules/purchase/purchase.route");
const cart_route_1 = require("../modules/cart/cart.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/portfolio",
        route: portfolio_route_1.PortfolioRoutes,
    },
    {
        path: "/users",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/checkout",
        route: purchase_route_1.PurchaseRoutes,
    },
    {
        path: "/cart",
        route: cart_route_1.CartRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
