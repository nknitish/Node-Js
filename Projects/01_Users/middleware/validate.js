export const validate = (schema, type = "body") => {
  return (req, res, next) => {
    const result = schema.safeParse(req[type]);

    if (!result.success) {
      return next(result.error);
    }

    req.validated = req.validated || {};
    req.validated[type] = result.data;

    next();
  };
};
