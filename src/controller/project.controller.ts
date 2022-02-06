import { CustomRequest, Errors, Versions } from "../types";
import { Response } from "express";
import { connection } from "../db/connection";
import { Project } from "../db/entity/Project";
import { User } from "../db/entity/User";
import { Rule } from "../db/entity/Rule";

interface CreateProjectRequestBody {
	projectName: string;
	projectVersion: Versions;
}

export const create_project = async (
	req: CustomRequest<{}, CreateProjectRequestBody, {}>,
	res: Response
) => {
	const { projectName, projectVersion } = req.body;
	const errors: Errors = [];

	// Check if no project/no project version entered
	if (!projectName) {
		errors.push({
			message: "Please enter a project name",
			location: "projectNameInput",
		});
	}

	if (!projectVersion) {
		errors.push({
			message: "Please choose a project version",
			location: "projectVersionSelect",
		});
		return res.json(errors);
	}

	// Check if project already exists
	const foundProject = await connection
		.getRepository(Project)
		.createQueryBuilder("project")
		.where("project.projectName = :projectName", { projectName })
		.getOne();

	if (foundProject) {
		errors.push({
			message: "Project already exists",
			location: "projectNameInput",
		});
		return res.json(errors);
	}

	// Create project
	const newProject = new Project();
	newProject.projectName = projectName;
	newProject.projectVersion = projectVersion;

	await connection.manager.save(newProject);

	return res.json(newProject);
};

export const get_projects = async (req: CustomRequest<{}, {}, {}>, res) => {
	const projects = await connection
		.getRepository(Project)
		.createQueryBuilder()
		.getMany();

	return res.json(projects);
};

interface DeleteProjectParams {
	projectName: string;
}

export const delete_project = async (
	req: CustomRequest<DeleteProjectParams, {}, {}>,
	res: Response
) => {
	const { projectName } = req.params;

	await Project.delete({ projectName });

	// Delete all users in project
	await User.delete({ userProject: projectName });

	// Delete all project rules
	await Rule.delete({ ruleProject: projectName });

	res.json(projectName);
};
