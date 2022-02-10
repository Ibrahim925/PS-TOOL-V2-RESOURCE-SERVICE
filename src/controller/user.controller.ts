import { getConnectionManager } from "typeorm";
import { CustomRequest, Errors } from "../types";
import { Response } from "express";
import { User } from "../db/entity/User";
import { validateEmail } from "../helpers/emailValidation";
import { v4 as uuid } from "uuid";
import { SentMessageInfo } from "nodemailer/lib/smtp-transport";
import * as bcrypt from "bcryptjs";
import * as nodemailer from "nodemailer";

const connection = getConnectionManager().get("default");

// Initialize SMTP transporter with nodemailer
const transporter: nodemailer.Transporter<SentMessageInfo> =
	nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.email,
			pass: process.env.password,
		},
	});

export const get_user_data = async (
	req: CustomRequest<{}, {}, {}>,
	res: Response
) => {
	const { id } = req;

	// Look for this user in the database
	const user = await connection
		.getRepository(User)
		.createQueryBuilder("user")
		.where("user.id = :id", { id })
		.getOne();

	res.json(user);
};

interface createUserBody {
	userEmail: string;
	userProject: string;
}

export const create_user = async (
	req: CustomRequest<{}, createUserBody, {}>,
	res: Response
) => {
	const { userEmail, userProject } = req.body;
	const errors: Errors = [];

	if (!userEmail) {
		errors.push({
			message: "Please enter an email",
			location: "emailInput",
		});

		return res.json(errors);
	}

	if (!validateEmail(userEmail)) {
		errors.push({
			message: "Please enter a valid email",
			location: "emailInput",
		});

		return res.json(errors);
	}

	const foundUser = await connection
		.getRepository(User)
		.createQueryBuilder("user")
		.where("user.userEmail = :userEmail", { userEmail })
		.getOne();

	if (foundUser) {
		errors.push({
			message: "An account with this email already exists",
			location: "emailInput",
		});

		return res.json(errors);
	}

	const userPassword: string = uuid();
	const salt = await bcrypt.genSalt(10);
	const encryptedPassword = await bcrypt.hash(userPassword, salt);

	const newCustomer = new User();
	newCustomer.userEmail = userEmail;
	newCustomer.userPassword = encryptedPassword;
	newCustomer.userProject = userProject;
	newCustomer.userType = "CUSTOMER";

	await connection.manager.save(newCustomer);

	await transporter.sendMail({
		from: process.env.email,
		to: userEmail,
		subject: "LogiSense Account Creation",
		text: `An account was created with this email. Your password is ${userPassword}`,
	});

	return res.json(newCustomer);
};

interface GetProjectUsersParams {
	projectName: string;
}

export const get_project_users = async (
	req: CustomRequest<GetProjectUsersParams, {}, {}>,
	res: Response
) => {
	const { projectName } = req.params;

	const foundUsers = await connection
		.getRepository(User)
		.createQueryBuilder("user")
		.where("user.userProject = :projectName", { projectName })
		.getMany();

	return res.json(foundUsers);
};

interface DeleteProjectUserParams {
	id: number;
}

export const delete_project_user = async (
	req: CustomRequest<DeleteProjectUserParams, {}, {}>,
	res: Response
) => {
	try {
		const { id } = req.params;

		await User.delete({ id });

		return res.sendStatus(200);
	} catch (error) {}
};
