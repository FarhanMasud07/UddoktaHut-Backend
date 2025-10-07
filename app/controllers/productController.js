import {
  fetchAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService.js";

const addProduct = async (req, res, next) => {
  try {
    // req.body is already validated by middleware
    const userId = req.user.id;
    const product = await createProduct(req.body, userId);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    // req.query is already validated and transformed by middleware
    const result = await fetchAllProducts({
      ...req.query,
      userId: req.user.id,
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const editProduct = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const product = await updateProduct(req.params.id, req.body, userId);
    res.json(product);
  } catch (err) {
    next(err);
  }
};

const removeProduct = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const productId = req.params.id;
    const result = await deleteProduct(productId, userId);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export { getAllProducts, addProduct, editProduct, removeProduct };
