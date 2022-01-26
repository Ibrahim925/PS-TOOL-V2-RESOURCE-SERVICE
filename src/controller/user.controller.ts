import { CustomRequest } from "../types";
import { Request, Response } from "express";

export const get_user_data = async (
	req: CustomRequest<{ bob: string }, { name: string }, { hi: string }>,
	res: Response
) => {};
