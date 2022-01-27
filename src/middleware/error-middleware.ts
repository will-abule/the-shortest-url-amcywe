import { NextFunction, Request, Response } from "express";
import { getSavedErrorData, saveErrorDataToAFile } from "../db";
import { ErrorInterface } from "../utils/interfaces/error-interface";

export const errorMiddleWare = (
  error: any,
  _: Request,
  __: Response,
  next: NextFunction
) => {
  const data: ErrorInterface[] = [
    ...getSavedErrorData(),
    ...[
      {
        time: new Date().toLocaleDateString(),
        error: JSON.stringify(error),
      },
    ],
  ];

  saveErrorDataToAFile(data, () => {
    next();
  });
};
