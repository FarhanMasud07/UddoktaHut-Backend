import { getStoreProducts } from "../services/storeService.js";

const getPublicStoreProducts = async (req, res, next) => {
  try {
    const storeName = req.params.storeName;
    const result = await getStoreProducts(storeName, req.query);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export { getPublicStoreProducts };
