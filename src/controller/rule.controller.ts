import { CustomRequest } from "../types";
import { Response } from "express";
import { CSVToJSON } from "../helpers/csv";

interface CreateRulesBody {
	text: string;
}

export const create_rules = async (
	req: CustomRequest<{}, CreateRulesBody, {}>,
	res: Response
) => {
	console.log(req.body.text);

	console.log(CSVToJSON(req.body.text));

	res.sendStatus(200);
};
