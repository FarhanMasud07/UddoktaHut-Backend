import { Store } from "../models/RootModel.js";

const getVerifiedStore = async ({ storeName }) => {
  return await Store.findOne({ where: { store_name: storeName } });
};

export { getVerifiedStore };
