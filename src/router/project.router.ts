import { Router } from "express";
import {
	create_project,
	get_projects,
	delete_project,
} from "../controller/project.controller";

const router: Router = Router();

// Create a project
router.post("/", create_project);

// Get all projects
router.get("/", get_projects);

// Delete project
router.delete("/:projectName", delete_project);

export default router;
