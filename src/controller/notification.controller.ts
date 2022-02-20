import { Notification } from "../db/entity/Notification";
import { Response } from "express";
import { CustomRequest } from "../types";

interface GetNotificationsParams {
	projectName: string;
}

export const get_notifications = async (
	req: CustomRequest<GetNotificationsParams, {}, {}>,
	res: Response
) => {
	const { projectName } = req.params;

	const notifications = await Notification.find({
		where: { notificationProject: projectName },
	});

	return res.json(notifications);
};
