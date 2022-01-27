import { errorMiddleWare } from "./../middleware/error-middleware";
import { Express, Response } from "express";
import { encodeRoute } from "./path/encode-route";
import { decodeRoute } from "./path/decode-route";

export const routes = async (app: Express) => {
  // Routes

  app.get("/", (req, res: Response) => {
    if (req.body.test) throw "Testing ErrorMiddleware";

    res.status(200).send("Welcome to Will Abule FINN Backend Developer Test!");
  });

  app.use("/encode", encodeRoute);
  app.use("/decode", decodeRoute);

  app.use(errorMiddleWare);
};
