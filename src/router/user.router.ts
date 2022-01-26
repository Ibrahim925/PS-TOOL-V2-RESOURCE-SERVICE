import { Router } from "express";
import { get_user_data } from "../controller/user.controller";

const router: Router = Router();

// Get user data
router.get("/", get_user_data);
