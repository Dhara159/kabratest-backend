import Product from './../models/Product.mjs';
import handleError from './../helpers/errorHandler.mjs'

// Fetch the list of products
export const fetchAllProducts = async (res) => {
  return await handleError({
    tryFunc: async () => {
      let productItems = [];
      const products = await Product.fetchAllProducts();

      // Restructure the data to remove sub-category and return only name, imageUrl, description and price
      products.forEach(({ items }) => productItems = [...productItems, ...items]);
      return res.json(productItems);
    }, res
  });
};