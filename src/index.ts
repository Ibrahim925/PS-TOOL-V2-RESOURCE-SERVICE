import express from "express";
import cors from "cors";
import userRouter from "./router/user.router";
import projectRouter from "./router/project.router";
import ruleRouter from "./router/rule.router";
import notificationRouter from "./router/notification.router";
import errorRouter from "./router/error.router";
import authenticateAccessToken from "./middlewares/authenticateAccessToken";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

app.use(authenticateAccessToken);

app.use("/user", userRouter);
app.use("/project", projectRouter);
app.use("/rule", ruleRouter);
app.use("/notification", notificationRouter);
app.use("/error", errorRouter);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
