import { Router } from "express";
import { create_project } from "../controller/project.controller";

const router: Router = Router();

// Create a project
router.post("/", create_project);

export default router;
