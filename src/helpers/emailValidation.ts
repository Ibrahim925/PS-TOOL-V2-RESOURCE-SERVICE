export const validateEmail = (email: string): boolean => {
	const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return regEx.test(email);
};

export const validateLogiSenseEmail = (email: string): boolean => {
	const domain = email.split("@")[1];

	return domain === "logisense.com";
};
