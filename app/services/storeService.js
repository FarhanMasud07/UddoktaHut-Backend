import { paginateQuery } from "../lib/pagination.js";
import { Store, Product } from "../models/RootModel.js";

const getStoreProducts = async (storeName, query) => {
  const {
    page = 1,
    pageSize = 10,
    search = "",
    sortBy = "id",
    sortOrder = "desc",
  } = query;
  const result = await paginateQuery(Product, {
    page,
    pageSize,
    search,
    searchFields: ["name", "category", "sku"],
    sortBy,
    sortOrder,
    include: [
      {
        model: Store,
        where: { store_name: storeName },
        attributes: [],
      },
    ],
    where: { status: "Active" },
  });
  // Only return public fields
  const products = result.data.map((product) => {
    const { id, name, image, price, stock, status, category, sku } =
      product.get({ plain: true });
    return { id, name, image, price, stock, status, category, sku };
  });
  return {
    data: products,
    total: result.total,
    page: result.page,
    pageSize: result.pageSize,
  };
};

export { getStoreProducts };
