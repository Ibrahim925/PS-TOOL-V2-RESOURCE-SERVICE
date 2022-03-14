import { Router } from "express";
import { get_project_errors } from "../controller/error.controller";

const router: Router = Router();

router.get("/:projectName", get_project_errors);

export default router;
