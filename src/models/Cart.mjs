import mongoose from 'mongoose';

// Cart schema: To make cart accessible accross the machine and browser
const cartSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: [{
    id: { type: Number, required: true },
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    quantity: { type: Number, required: true }
  }],
  total: {
    type: Number,
    required: true,
    default: 0
  }
});

// Make fetchCart, addOrUpdateCartItem methods available on Cart schema which are only responsible to interact with database and nothing else.

cartSchema.statics.fetchCart = async ({ userId }) => await Cart.find({ userId });

cartSchema.statics.addOrUpdateCartItem = async ({ cartToBeUpdated: cart }) => await Cart.findOneAndUpdate(
  { userId: cart.userId },
  cart,
  { upsert: true, new: true, useFindAndModify: false }
);

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;