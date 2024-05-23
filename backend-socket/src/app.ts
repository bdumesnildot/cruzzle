import express, { Application } from "express";
import cors from "cors";

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

const app: Application = express();

const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
    "Authorization",
    "Access-Control-Allow-Origin",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: [frontendUrl, "http://localhost:3000", "http://localhost:8080"],
  preflightContinue: false,
};
app.use(cors(options));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello 🧦" });
});

app.get("/api", (req, res) => {
  res.status(200).json({ message: "Hello 🧦" });
});

export default app;
