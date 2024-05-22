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
  origin: [frontendUrl, "http://localhost:3000", "http://localhost:3001"],
  preflightContinue: false,
};
app.use(cors(options));

export default app;
