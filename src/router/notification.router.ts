import { Router } from "express";
import { get_notifications } from "../controller/notification.controller";

const router: Router = Router();

router.get("/:projectName", get_notifications);

export default router;
