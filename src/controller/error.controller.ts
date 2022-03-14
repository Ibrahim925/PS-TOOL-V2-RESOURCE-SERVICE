import { Response } from "express";
import { Error } from "../db/entity/Error";
import { CustomRequest } from "../types";

interface GetProjectErrorsParams {
	projectName: string;
}

export const get_project_errors = async (
	req: CustomRequest<GetProjectErrorsParams, {}, {}>,
	res: Response
) => {
	const { projectName } = req.params;
};
