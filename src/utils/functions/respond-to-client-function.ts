import { Response } from "express";
import { ResponseInterface } from "../interfaces/api-response-interface";

export const respondToClient = (res: Response, data: ResponseInterface) =>
  res.status(data.status).send(data);
