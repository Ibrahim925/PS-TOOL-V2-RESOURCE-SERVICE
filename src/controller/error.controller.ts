import { Response } from "express";
import { Error } from "../db/entity/Error";
import { JSONtoCSV } from "../helpers/csv";
import { CustomRequest } from "../types";

interface GetProjectErrorsParams {
	projectName: string;
}

export const get_project_errors = async (
	req: CustomRequest<GetProjectErrorsParams, {}, {}>,
	res: Response
) => {
	const { projectName } = req.params;

	const errors = await Error.getRepository().find({
		where: { errorProject: projectName },
		order: { errorObject: "ASC" },
		select: [
			"errorObject",
			"errorRun",
			"errorCount",
			"errorFree",
			"errorDataType",
			"errorDependency",
			"errorExistence",
		],
	});

	const csvReport = await JSONtoCSV(errors, [
		"Object Name",
		"Run",
		"Error Count",
		"Success Count",
		"Data Type Errors",
		"Dependency Errors",
		"Existence Errors",
	]);

	res.json(csvReport);
};
