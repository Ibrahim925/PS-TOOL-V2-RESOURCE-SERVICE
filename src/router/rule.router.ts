import { Router } from "express";
import { create_rules } from "../controller/rule.controller";

const router: Router = Router();

// Create rules
router.post("/", create_rules);

export default router;
