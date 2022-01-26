import * as express from "express";
import * as cors from "cors";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("BOBOBOBOOBOB");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
