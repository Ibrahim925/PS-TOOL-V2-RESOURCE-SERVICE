import { Router } from "express";
import { get_user_data, create_user } from "../controller/user.controller";

const router: Router = Router();

// Get user data
router.get("/", get_user_data);

// Create user (customer)
router.post("/", create_user);

export default router;
