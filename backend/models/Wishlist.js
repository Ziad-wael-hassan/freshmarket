import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: String, // Firebase UID
    required: true,
    unique: true,
    index: true
  },
  products: [{
    productId: String,
    title: String,
    image: String,
    price: Number,
    category: String,
    brand: String,
    ratingsAverage: Number
  }]
}, { timestamps: true });

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;
