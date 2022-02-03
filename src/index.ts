import * as express from "express";
import * as cors from "cors";
import userRouter from "./router/user.router";
import projectRouter from "./router/project.router";
import ruleRouter from "./router/rule.router";
import authenticateRefreshToken from "./middlewares/validateAccessToken";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

app.use(authenticateRefreshToken);

app.use("/user", userRouter);
app.use("/project", projectRouter);
app.use("/rule", ruleRouter);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
