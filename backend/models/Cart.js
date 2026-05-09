import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: String, // Storing RouteMisr productId as string
    required: true
  },
  title: String,
  image: String,
  price: Number,
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  }
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: String, // Firebase UID
    required: true,
    unique: true,
    index: true
  },
  products: [cartItemSchema],
  totalCartPrice: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

// Pre-save hook to calculate total price
cartSchema.pre('save', function(next) {
  this.totalCartPrice = this.products.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  next();
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
