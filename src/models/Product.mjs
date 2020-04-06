import mongoose from 'mongoose';

// Product schema
const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  routeName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  items: [{
    id: { type: Number, required: true },
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    description: String
  }]
});

// Make fetchAllProducts available on Cart schema which are only responsible to interact with database and nothing else.
productSchema.statics.fetchAllProducts = async () => await Product.find({}, { 'items.id': 0 });

const Product = mongoose.model('Product', productSchema);

export default Product;