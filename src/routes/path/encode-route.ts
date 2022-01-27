import { Request, Response, Router } from "express";
import { respondToClient } from "../../utils/functions/respond-to-client-function";
import {
  saveDataToAFile,
  getSavedData,
  saveErrorDataToAFile,
  getSavedErrorData,
} from "../../db";
import { DBInterface } from "../../utils/interfaces/db-interface";

const router = Router();

export const generateCode = (
  data: DBInterface[],
  url: string,
  _code = ""
): DBInterface => {
  let code = _code;
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  if (code.length === 0)
    for (var i = 0; i < 6; i++)
      code += possible.charAt(Math.floor(Math.random() * possible.length));

  if (data.find((d) => d.shortUrl === `http://short.est/${code}`))
    generateCode(data, url);

  return { url, shortUrl: `http://short.est/${code}` };
};

router.post("/", (req: Request, res: Response) => {
  try {
    // for testing

    if (req.body.test) throw "testing catch";

    // validating request body

    if (!req.body.url)
      return respondToClient(res, {
        status: 400,
        type: "error",
        message: "url is needed in the request body",
        data: null,
      });

    // getting all saved data

    const data = getSavedData();

    // checking if url already exist

    if (data.find((d) => d.url === req.body.url))
      return respondToClient(res, {
        status: 200,
        type: "success",
        message: "Url already encoded!",
        data: data.find((d) => d.url === req.body.url)!.shortUrl,
      });

    // shortening url

    const newData = generateCode(data, req.body.url);

    // saving shorted url
    // req.body.testFailToSaveFile is for testing purposes

    return saveDataToAFile(
      [...data, ...[newData]],
      (type) => {
        if (type === "error")
          respondToClient(res, {
            status: 500,
            type: "error",
            message: "unable to process your request kindly try again!",
            data: null,
          });
        else
          respondToClient(res, {
            status: 200,
            type: "success",
            message: "success",
            data: newData.shortUrl,
          });
      },
      req.body.testFailToSaveFile
    );
  } catch (error) {
    return saveErrorDataToAFile(
      [
        ...getSavedErrorData(),
        ...[
          { time: new Date().toLocaleString(), error: JSON.stringify(error) },
        ],
      ],
      (type) => {
        if (type === "error")
          respondToClient(res, {
            status: 500,
            type: "error",
            message: "Internal Server Error!",
            data: JSON.stringify(error),
          });
        else
          respondToClient(res, {
            status: 500,
            type: "error",
            message: "Internal Server Error!",
            data: null,
          });
      },
      req.body.testFailToSaveFile
    );
  }
});

export const encodeRoute = router;
