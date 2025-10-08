import { Op } from "sequelize";

export async function paginateQuery(
  model,
  {
    page = 1,
    pageSize = 10,
    where = {},
    search = "",
    searchFields = [],
    sortBy = "id",
    sortOrder = "asc",
    include = [],
  } = {}
) {
  // Add search filter if provided
  if (search && searchFields.length > 0) {
    where[Op.or] = searchFields.map((field) => ({
      [field]: { [Op.iLike]: `%${search}%` },
    }));
  }

  const order = [];
  if (sortBy) {
    order.push([
      sortBy,
      sortOrder && sortOrder.toLowerCase() === "desc" ? "DESC" : "ASC",
    ]);
  }

  const offset = (page - 1) * pageSize;
  const limit = pageSize;

  const { count, rows } = await model.findAndCountAll({
    where,
    order,
    offset,
    limit,
    include,
  });

  return {
    data: rows,
    total: count,
    page,
    pageSize,
  };
}
