import { Router } from "express";
import { UserControllers } from "./user.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post("/register", UserControllers.createUser);
router.get("/me", auth("user"), UserControllers.getMe);
router.post("/:id", auth("user"), UserControllers.updateUser);

export const UserRoutes = router;
