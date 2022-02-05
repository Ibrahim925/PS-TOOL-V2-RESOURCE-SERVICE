import { CustomRequest } from "../types";
import { Response } from "express";
import { CSVToJSON } from "../helpers/csv";

interface CreateRulesBody {
	csvText: string;
}

export const create_rules = async (
	req: CustomRequest<{}, CreateRulesBody, {}>,
	res: Response
) => {
	const { csvText } = req.body;

	const csvJSON = CSVToJSON(csvText);

	res.json(csvJSON);
};
