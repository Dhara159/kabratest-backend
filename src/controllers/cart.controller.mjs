import Cart from './../models/Cart.mjs';
import handleError from './../helpers/errorHandler.mjs'

// Fetch cart details of single user
export const fetchCart = async ({ user: { _id: userId } }, res) => {
  return await handleError({
    tryFunc: async () => {
      const userCart = await Cart.fetchCart({ userId });
      return res.json(userCart);
    }, res
  });
}

// Add new cartItem or update the quantity of existing cartItem ,update total amound based on quantity change
export const addOrUpdateCartItem = async ({ body: cartItemToAdd, user: { _id: userId } }, res) => {
  return await handleError({
    tryFunc: async () => {
      // Cart data of the user
      const userCart = await Cart.fetchCart({ userId });
      const cartToBeUpdated = userCart[0] || {
        userId,
        total: 0,
        items: []
      };

      // Check if item exist in the cart
      const existingCartItem = (cartToBeUpdated && cartToBeUpdated.items) ? cartToBeUpdated.items.find(cartItem => cartItem.id === cartItemToAdd.id) : false;

      // Update the quantity if item waa already in cart || Add new item to cart
      !!existingCartItem ? (cartToBeUpdated.items.map(cartItem => {
        if (cartItem.id === cartItemToAdd.id) cartItem.quantity += 1;
      })) : cartToBeUpdated.items.push({ ...cartItemToAdd, quantity: 1 });

      // Update the final cart amount
      cartToBeUpdated.total = cartToBeUpdated.total + cartItemToAdd.price;
      const updatedUserCart = await Cart.addOrUpdateCartItem({ cartToBeUpdated });
      return res.json(updatedUserCart);
    }, res
  });
};

