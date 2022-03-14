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
		order: {
			id: "DESC",
		},
	});

	return res.json(notifications);
};

interface DeleteNotificationBody {
	id: number;
}

export const delete_notification = async (
	req: CustomRequest<DeleteNotificationBody, {}, {}>,
	res: Response
) => {
	const { id } = req.params;

	await Notification.delete({ id });

	res.sendStatus(200);
};
