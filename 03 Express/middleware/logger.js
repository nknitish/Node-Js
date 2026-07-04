export const log = (req, res, next) => {
  console.log("Logginer");
  next();
};
