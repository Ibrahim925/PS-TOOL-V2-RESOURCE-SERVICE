import { Router } from "express";
import {
	create_rules,
	get_objects,
	get_rules,
	get_object_rules,
} from "../controller/rule.controller";

const router: Router = Router();

// Create rules
router.post("/", create_rules);

// Get objects
router.get("/object/:projectName/:objectName", get_objects);

// Get object rules
router.get("/object/:ruleObject", get_object_rules);

// Get all rules
router.get("/:projectName", get_rules);

export default router;
