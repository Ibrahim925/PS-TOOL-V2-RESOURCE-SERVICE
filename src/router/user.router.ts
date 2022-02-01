import { Router } from "express";
import {
	get_user_data,
	create_user,
	get_project_users,
} from "../controller/user.controller";

const router: Router = Router();

// Get user data
router.get("/", get_user_data);

// Create user (customer)
router.post("/", create_user);

// Get project users
router.get("/:projectName", get_project_users);

export default router;
