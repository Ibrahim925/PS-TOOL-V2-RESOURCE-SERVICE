import { Request } from "express";

// Base custom request body
export interface CustomRequest<T> extends Request {
	body: T;
}

// Errors sent to user
export interface Error {
	message: string;
	location?: string;
}

export type Errors = Error[];

// Success message
export enum SuccessMessage {
	Success = "SUCCESS",
}
