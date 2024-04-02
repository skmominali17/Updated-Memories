import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connectToDB from "./connectDB";
import router from "./routes/routes";
import cors from "cors"

dotenv.config();
connectToDB();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/", router);


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});