import "express-async-errors";
import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import { routes } from "./routes/routes";
import { logger } from "./logging";

const app = express();

// setup files

app.use(express.json());

app.use(cors());
app.use(helmet());
app.use(compression());

routes(app);

logger();

console.log(
  new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }))
);

export const port = process.env.PORT || 1000;

export const server = app.listen(port, () =>
  console.info(`listening on port ${port}`)
);
