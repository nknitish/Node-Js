export const validateUserQuery = (req, res, next) => {
  let { limit = 10, page = 1, sort, order = "asc" } = req.query;

  // Pagination Error Handling
  page = Number.parseInt(page, 10);
  limit = Number.parseInt(limit, 10);

  if (
    !Number.isInteger(page) ||
    !Number.isInteger(limit) ||
    page <= 0 ||
    limit <= 0 ||
    limit > 100
  ) {
    return res.status(400).json({ message: "Invalid Pagination Query" });
  }

  // Sorting & Order Handling

  const allowedSorting = ["name", "email", "createdAt"];
  const allowedOrder = ["asc", "desc"];
  const normalizedOrder = String(order).toLowerCase();

  if (sort && !allowedSorting.includes(sort)) {
    return res.status(400).json({ message: "Invalid Sort value" });
  }

  if (order && !allowedOrder.includes(normalizedOrder)) {
    return res
      .status(400)
      .json({ message: "Invalid Order value. It can be asc or desc" });
  }

  // Normalising Requst Query

  req.query.page = page;
  req.query.limit = limit;
  req.query.order = normalizedOrder;

  next();
};
