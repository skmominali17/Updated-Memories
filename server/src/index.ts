import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connectToDB from "./connectDB";
import router from "./routes/routes";
import cors from "cors"
import morgan from "morgan"

dotenv.config();
connectToDB();

const app: Express = express();
const port = process.env.PORT || 3000;

morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
})

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  exposedHeaders: ['Authorization']
}));
app.use("/", router);


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});