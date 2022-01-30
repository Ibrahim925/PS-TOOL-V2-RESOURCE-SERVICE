import { Router } from "express";
import { create_project, get_projects } from "../controller/project.controller";

const router: Router = Router();

// Create a project
router.post("/", create_project);

// Get all projects
router.get("/", get_projects);

export default router;
