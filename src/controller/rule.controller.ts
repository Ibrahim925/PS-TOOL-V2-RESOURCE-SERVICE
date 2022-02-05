import { CustomRequest } from "../types";
import { Response } from "express";

interface CreateRulesBody {
	text: string;
}

export const create_rules = async (
	req: CustomRequest<{}, CreateRulesBody, {}>,
	res: Response
) => {
	console.log(req.body.text);
};
