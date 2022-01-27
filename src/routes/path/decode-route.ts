import { Request, Response, Router } from "express";
import { respondToClient } from "../../utils/functions/respond-to-client-function";
import {
  getSavedData,
  getSavedErrorData,
  saveErrorDataToAFile,
} from "../../db";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  try {
    // for testing

    if (req.body.test) throw "testing catch";

    // validating query params

    if (!req.query.shortUrl)
      return respondToClient(res, {
        status: 400,
        type: "error",
        message: "shortUrl is needed in as query params",
        data: null,
      });

    // getting all saved data
    // &
    // Decodes a shortened URL to its original URL

    const data = getSavedData().find((d) => d.shortUrl === req.query.shortUrl);

    if (data)
      return respondToClient(res, {
        status: 200,
        type: "success",
        message: "success",
        data: data.url,
      });

    return respondToClient(res, {
      status: 404,
      type: "error",
      message: `unable to decode ${req.query.shortUrl}`,
      data: null,
    });
  } catch (error) {
    return saveErrorDataToAFile(
      [
        ...getSavedErrorData(),
        ...[
          {
            time: new Date().toLocaleString(),
            error: JSON.stringify(error),
          },
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

export const decodeRoute = router;
