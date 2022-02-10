import "reflect-metadata";
import { createConnection } from "typeorm";
import "dotenv/config";

(async () => {
	await createConnection({
		type: "mysql",
		host: "localhost",
		port: 3306,
		username: "test",
		password: "test",
		database: "test",
		name: "DB",
	});
})();
