import express from 'express';
import Cart from '../models/Cart.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// All cart routes are protected
router.use(authMiddleware);

/**
 * GET /api/v1/cart
 */
router.get('/', async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.uid });
    
    if (!cart) {
      cart = await Cart.create({ userId: req.user.uid, products: [] });
    }

    res.status(200).json({
      status: 'success',
      numOfCartItems: cart.products.length,
      data: cart
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * POST /api/v1/cart
 */
router.post('/', async (req, res) => {
  try {
    const { productId, title, image, price } = req.body;
    let cart = await Cart.findOne({ userId: req.user.uid });

    if (!cart) {
      cart = new Cart({ userId: req.user.uid, products: [] });
    }

    const itemIndex = cart.products.findIndex(p => p.productId === productId);

    if (itemIndex > -1) {
      cart.products[itemIndex].quantity += 1;
    } else {
      cart.products.push({ productId, title, image, price, quantity: 1 });
    }

    await cart.save();

    res.status(200).json({
      status: 'success',
      message: 'Product added successfully',
      numOfCartItems: cart.products.length,
      data: cart
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * PUT /api/v1/cart/:productId
 */
router.put('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const { count } = req.body;

    const cart = await Cart.findOne({ userId: req.user.uid });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const itemIndex = cart.products.findIndex(p => p.productId === productId);

    if (itemIndex > -1) {
      cart.products[itemIndex].quantity = count;
      await cart.save();
      
      res.status(200).json({
        status: 'success',
        numOfCartItems: cart.products.length,
        data: cart
      });
    } else {
      res.status(404).json({ message: 'Product not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * DELETE /api/v1/cart/:productId
 */
router.delete('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ userId: req.user.uid });

    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.products = cart.products.filter(p => p.productId !== productId);
    await cart.save();

    res.status(200).json({
      status: 'success',
      numOfCartItems: cart.products.length,
      data: cart
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * DELETE /api/v1/cart
 */
router.delete('/', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.uid });

    if (cart) {
      cart.products = [];
      await cart.save();
    }

    res.status(200).json({
      status: 'success',
      message: 'Cart cleared successfully',
      data: cart
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
