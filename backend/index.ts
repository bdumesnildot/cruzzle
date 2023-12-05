import dotenv, { DotenvConfigOptions } from "dotenv";

import app from "./src/app";

dotenv.config(<DotenvConfigOptions>{ silent: true });

const port: number = parseInt(process.env.APP_PORT ?? "8000", 10);

app.listen(port, () => {
  console.info(`⚡️[server]: Server is running at http://localhost:${port}`);
});
