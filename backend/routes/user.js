import express from 'express';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);

/**
 * GET /api/v1/users/profile
 * Fetch authenticated user profile
 */
router.get('/profile', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      _id: req.user.uid,
      name: req.user.name,
      email: req.user.email,
      role: 'user'
    }
  });
});

/**
 * PUT /api/v1/users/updateMe
 * Update user profile
 */
router.put('/updateMe', (req, res) => {
  // Logic to update user in DB if needed
  res.status(200).json({
    status: 'success',
    data: {
      ...req.user,
      ...req.body
    }
  });
});

export default router;
