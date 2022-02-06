import { CustomRequest, DataTypes, Errors, LogiObject, Rules } from "../types";
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
	const errors: Errors = [];

	const expectedFields = [
		"configuration",
		"object",
		"field",
		"dataType",
		"required",
		"case",
		"dependency",
	];
	const expectedNumberOfFields = expectedFields.length;
	const csvJSON: Rules = await CSVToJSON(csvText);

	const headers = Object.keys(csvJSON[0]);

	if (headers.length !== expectedNumberOfFields) {
		errors.push({ message: "Please enter a valid rules spreadsheet!" });

		return res.json(errors);
	}

	for (let i = 0; i < expectedNumberOfFields; i++) {
		if (headers[i] !== expectedFields[i]) {
			errors.push({
				message: "Please enter a valid rules spreadsheet!",
			});

			return res.json(errors);
		}
	}

	try {
		// Delete all previous rules
		await Rule.delete({ ruleProject: projectName });

		const fieldOccuranceTracker = {};

		// Loop through rules and save them
		for await (const rule of csvJSON) {
			const key = `${rule.object}${rule.field}`;

			if (fieldOccuranceTracker[key] === undefined) {
				fieldOccuranceTracker[key] = 0;
			} else {
				fieldOccuranceTracker[key] += 1;
			}

			const newRule = new Rule();
			newRule.ruleProject = projectName;
			newRule.ruleCase = rule.case;
			newRule.ruleConfiguration = rule.configuration;
			newRule.ruleDataType = rule.dataType;
			newRule.ruleDependency = rule.dependency;
			newRule.ruleObject = rule.object;
			newRule.ruleRequired = rule.required;
			newRule.ruleField = rule.field;
			newRule.ruleFieldOccurance = fieldOccuranceTracker[key];

			await connection.manager.save(newRule);
		}

		return res.json(csvJSON);
	} catch (error) {
		console.log(error);
	}
};

interface GetObjectsParams {
	projectName: string;
}

export const get_objects = async (
	req: CustomRequest<GetObjectsParams, {}, {}>,
	res: Response
) => {
	const { projectName } = req.params;

	// Get all unique objects from rules
	const rules = await connection
		.getRepository(Rule)
		.createQueryBuilder("rule")
		.where("rule.ruleProject = :projectName", { projectName })
		.getMany();

	// TODO: SEND BACK OBJECTS
	const objectNames: LogiObject[] = [];
	rules
		.map((rule) => ({ ...rule, ruleObject: rule.ruleObject.trim() }))
		.forEach((rule) => {
			if (
				objectNames.map((object) => object.objectName).includes(rule.ruleObject)
			)
				return;

			objectNames.push({
				objectName: rule.ruleObject,
				objectConfig: rule.ruleConfiguration,
			});
		});

	res.json(objectNames);
};
