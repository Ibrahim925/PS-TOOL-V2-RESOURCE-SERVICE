import { Router } from "express";
import {
	delete_notification,
	get_notifications,
} from "../controller/notification.controller";

const router: Router = Router();

router.get("/:projectName", get_notifications);

router.delete("/:id", delete_notification);

export default router;
