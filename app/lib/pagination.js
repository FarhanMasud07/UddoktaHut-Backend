import { Op } from "sequelize";

/**
 * Generic pagination utility for Sequelize models.
 * @param {Object} model - Sequelize model
 * @param {Object} options
 * @param {number} options.page - 1-based page number
 * @param {number} options.pageSize - items per page
 * @param {Object} [options.where] - additional where conditions
 * @param {string} [options.search] - search string (optional)
 * @param {string[]} [options.searchFields] - fields to search in (optional)
 * @param {string} [options.sortBy] - column to sort by
 * @param {string} [options.sortOrder] - 'asc' or 'desc'
 * @param {Array} [options.include] - Sequelize include option
 * @returns {Promise<{data: Array, total: number, page: number, pageSize: number}>}
 */
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
