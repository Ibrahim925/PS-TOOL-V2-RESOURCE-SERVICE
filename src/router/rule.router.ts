import { Router } from "express";
import {
	create_rules,
	get_objects,
	get_rules,
} from "../controller/rule.controller";

const router: Router = Router();

// Create rules
router.post("/", create_rules);

// Get objects
router.get("/object/:projectName", get_objects);

// Get rules
router.get("/:projectName", get_rules);

export default router;
