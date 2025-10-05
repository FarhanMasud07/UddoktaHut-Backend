import { Store, Product } from "../models/RootModel.js";

const getVerifiedStore = async ({ storeName }) => {
  const store = await Store.findOne({ where: { store_name: storeName } });
  if (!store) return null;
  // Fetch only active products for this store
  const productsRaw = await Product.findAll({
    where: { store_id: store.id, status: "Active" },
  });
  // Omit user_id from each product
  const products = productsRaw.map(({ dataValues }) => {
    const { user_id, ...rest } = dataValues;
    return rest;
  });
  return { store, products };
};

export { getVerifiedStore };
