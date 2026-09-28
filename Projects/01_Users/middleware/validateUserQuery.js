export const validateUserQuery = (req, res, next) => {
  let { limit = "10", page = "1", sort, order = "asc" } = req.query;

  // Validate integer format before converting
  const isPositiveInteger = (value) => /^\d+$/.test(String(value));

  if (!isPositiveInteger(page) || !isPositiveInteger(limit)) {
    return res.status(400).json({
      message: "Page and limit must be positive integers",
    });
  }

  // Convert validated strings to numbers
  page = Number(page);
  limit = Number(limit);

  // Validate numeric constraints
  if (
    !Number.isInteger(page) ||
    !Number.isInteger(limit) ||
    page <= 0 ||
    limit <= 0 ||
    limit > 100
  ) {
    return res.status(400).json({
      message: "Invalid Pagination Query",
    });
  }

  // Validate sorting
  const allowedSorting = ["name", "email", "createdAt"];
  const allowedOrder = ["asc", "desc"];

  const normalizedOrder = String(order).toLowerCase();

  if (sort && !allowedSorting.includes(sort)) {
    return res.status(400).json({
      message: "Invalid Sort value",
    });
  }

  if (!allowedOrder.includes(normalizedOrder)) {
    return res.status(400).json({
      message: "Invalid Order value. It can be asc or desc",
    });
  }

  // Store normalized values for the controller
  req.query.page = page;
  req.query.limit = limit;
  req.query.order = normalizedOrder;

  next();
};
