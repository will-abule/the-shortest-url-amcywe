import fs from "fs";
import path from "path";
import { DBInterface } from "../src/utils/interfaces/db-interface";
import { ErrorInterface } from "../src/utils/interfaces/error-interface";

const location = path.resolve(
    __dirname,
    process.env.NODE_ENV === "test"
      ? "../files/test-data.json"
      : "../files/data.json"
  ),
  errorLocation = path.resolve(__dirname, "../files/error-logs.json");

// saving data to a file

export const saveDataToAFile = (
  data: DBInterface[],
  callback: (type: string) => any,
  testFailToSaveFile = false
) => {
  fs.writeFile(location, JSON.stringify(data), (err) => {
    if (err || testFailToSaveFile) callback("error");
    else callback("success");
  });
};

export const saveErrorDataToAFile = (
  data: ErrorInterface[],
  callback: (type: string) => any,
  testFailToSaveFile = false
) =>
  fs.writeFile(errorLocation, JSON.stringify(data), (err) => {
    if (err || testFailToSaveFile) callback("error");
    else callback("success");
  });

// reading data from file

export const getSavedData = (): DBInterface[] => {
  const file = fs.readFileSync(location);

  const data: DBInterface[] = JSON.parse(file.toString());

  return data;
};

export const getSavedErrorData = (): ErrorInterface[] => {
  const file = fs.readFileSync(errorLocation);

  const errorData: ErrorInterface[] = JSON.parse(file.toString());

  return errorData;
};
