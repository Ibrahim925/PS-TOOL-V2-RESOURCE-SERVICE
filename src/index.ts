import * as express from "express";
import * as cors from "cors";
import { ConnectionManager } from "typeorm";
import userRouter from "./router/user.router";
import projectRouter from "./router/project.router";
import ruleRouter from "./router/rule.router";
import authenticateRefreshToken from "./middlewares/validateAccessToken";
import "dotenv/config";
import "reflect-metadata";

const app = express();

app.use(cors());
app.use(express.json());

app.use(authenticateRefreshToken);

app.use("/user", userRouter);
app.use("/project", projectRouter);
app.use("/rule", ruleRouter);

const connectionManager = new ConnectionManager();
const connection = connectionManager.create({
	name: "default",
	type: "mysql",
	host: process.env.dbHost,
	port: 3306,
	username: process.env.dbUserName,
	password: process.env.dbPassword,
	database: process.env.dbName,
	synchronize: true,
	entities: ["src/db/entity/**/*.ts"],
	cli: {
		entitiesDir: "src/db/entity",
		migrationsDir: "src/db/migration",
		subscribersDir: "src/db/subscriber",
	},
});
connection.connect();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
