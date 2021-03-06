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
		order: { errorObject: "ASC", errorRun: "ASC" },
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

	if (!errors.length) return res.json("");

	const csvReport = await JSONtoCSV(errors, {
		errorObject: "Object Name",
		errorRun: "Run",
		errorCount: "Error Count",
		errorFree: "Success Count",
		errorDataType: "Data Type Errors",
		errorDependency: "Dependency Errors",
		errorExistence: "Existence Errors",
	});

	res.json(csvReport);
};
