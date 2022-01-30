import { Request } from "express";

// Base custom request body
export interface CustomRequest<P, B, Q> extends Request<P, {}, B, Q, {}> {
	id?: number;
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

// Valid versions
export enum Versions {
	V9 = "V9",
	V10 = "V10",
}
