import { CustomRequest } from "../types";
import { Response } from "express";
import { User } from "../db/entity/User";
import { connection } from "../db/connection";

export const get_user_data = async (
	req: CustomRequest<{}, {}, {}>,
	res: Response
) => {
	const { id } = req;

	// Look for this user in the database
	const user = await connection
		.getRepository(User)
		.createQueryBuilder("user")
		.where("user.id = :id", { id })
		.getOne();

	res.json(user);
};
