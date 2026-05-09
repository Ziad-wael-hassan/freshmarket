import express from 'express';
import Wishlist from '../models/Wishlist.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// All wishlist routes are protected
router.use(authMiddleware);

/**
 * GET /api/v1/wishlist
 * Fetch the authenticated user's wishlist
 */
router.get('/', async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ userId: req.user.uid });
    
    if (!wishlist) {
      wishlist = await Wishlist.create({ userId: req.user.uid, products: [] });
    }

    res.status(200).json({
      status: 'success',
      count: wishlist.products.length,
      data: wishlist.products
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * POST /api/v1/wishlist
 * Add a product to the wishlist
 */
router.post('/', async (req, res) => {
  try {
    const productData = req.body; // Expect full product details
    let wishlist = await Wishlist.findOne({ userId: req.user.uid });

    if (!wishlist) {
      wishlist = new Wishlist({ userId: req.user.uid, products: [] });
    }

    const exists = wishlist.products.some(p => p.productId === productData.productId);

    if (!exists) {
      wishlist.products.push(productData);
      await wishlist.save();
    }

    res.status(200).json({
      status: 'success',
      message: 'Product added successfully to wishlist',
      data: wishlist.products.map(p => p.productId) // Returning IDs for easier UI sync
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * DELETE /api/v1/wishlist/:productId
 * Remove a product from the wishlist
 */
router.delete('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const wishlist = await Wishlist.findOne({ userId: req.user.uid });

    if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });

    wishlist.products = wishlist.products.filter(p => p.productId !== productId);
    await wishlist.save();

    res.status(200).json({
      status: 'success',
      message: 'Product removed successfully from wishlist',
      data: wishlist.products.map(p => p.productId)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
