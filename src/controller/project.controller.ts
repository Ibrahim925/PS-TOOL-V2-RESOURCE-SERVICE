import { CustomRequest, Errors, Versions } from "../types";
import { Response } from "express";
import { connection } from "../db/connection";
import { Project } from "../db/entity/Project";
import { User } from "../db/entity/User";
import { Rule } from "../db/entity/Rule";
import { Token } from "../db/entity/Token";
import { Notification } from "../db/entity/Notification";
import * as AWS from "aws-sdk";

AWS.config.update({
	region: "us-east-2",
	credentials: {
		accessKeyId: process.env.IAM_ACCESS_KEY,
		secretAccessKey: process.env.IAM_SECRET_KEY,
	},
});

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
	const foundProject = await Project.findOne({ where: { projectName } });

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
	const projects = await Project.find();

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

	Project.delete({ projectName });

	// Delete all users in project
	const users = await User.find({ userProject: projectName });

	for (const user of users) {
		Token.delete({ userId: user.id });
		User.remove(user);
	}

	// Delete all project rules
	Rule.delete({ ruleProject: projectName });

	// Delete all project notifications
	Notification.delete({ notificationProject: projectName });

	// Delete all persisted data related to this project
	const s3 = new AWS.S3();

	const listedObjects = await s3
		.listObjectsV2({ Bucket: "logisense-csv-data", Prefix: "VALIDATE/" })
		.promise();

	const objectKeys = listedObjects.Contents.map(({ Key }) => ({ Key }));

	console.log(objectKeys, "FJLDSJFKLDSJJJJJJJJJJJJJJJjj");

	await s3
		.deleteObjects(
			{
				Bucket: "logisense-csv-data",
				Delete: {
					Objects: objectKeys,
				},
			},
			(err, data) => {
				if (err) console.log(err);
			}
		)
		.promise();

	res.json(projectName);
};
