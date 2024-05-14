import express, { Application } from "express";
import cors from "cors";

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
  origin:
    process.env.NODE_ENV === "development" ? true : process.env.FRONTEND_URL,
  preflightContinue: false,
};
app.use(cors(options));

export default app;
