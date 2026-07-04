export const error404 = (req, res, next) => {
  res.status(404).json({ success: false, message: "Route Not Found" });
};

export const globalErrorHandler = (err, req, res, next) => {
  console.error(err);
  res
    .status(500)
    .json({ success: false, message: err.message || "Internal Server Error" });
};
