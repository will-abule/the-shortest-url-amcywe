export const logger = () => {
  process.on("uncaughtException", (ex) => {
    throw ex;
  });

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
};
