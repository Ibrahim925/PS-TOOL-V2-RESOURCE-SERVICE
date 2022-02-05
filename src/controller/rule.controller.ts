import { CustomRequest, DataTypes, Rules } from "../types";
import { Response } from "express";
import { CSVToJSON } from "../helpers/csv";
import { Rule } from "../db/entity/Rule";
import { connection } from "../db/connection";

interface CreateRulesBody {
	projectName: string;
	csvText: string;
}

export const create_rules = async (
	req: CustomRequest<{}, CreateRulesBody, {}>,
	res: Response
) => {
	const { projectName, csvText } = req.body;

	const csvJSON: Rules = await CSVToJSON(csvText);

	try {
		// Delete all previous rules
		await Rule.delete({ ruleProject: projectName });

		// Loop through rules and save them
		for await (const rule of csvJSON) {
			const newRule = new Rule();
			newRule.ruleProject = projectName;
			newRule.ruleCase = rule.case;
			newRule.ruleDataType = rule.dataType;
			newRule.ruleDependency = rule.dependency;
			newRule.ruleObject = rule.object;
			newRule.ruleRequired = rule.required;
			newRule.ruleFieldOccurance = 1;
			newRule.ruleField = rule.field;

			await connection.manager.save(newRule);
		}

		return res.json(csvJSON);
	} catch (error) {
		console.log(error);
	}
};
