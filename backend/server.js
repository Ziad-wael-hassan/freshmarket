import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import admin from 'firebase-admin'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import morgan from 'morgan'

// In-Memory Storage for Cart and Wishlist
// In a real production app, use MongoDB or PostgreSQL.
// This is used here because MongoDB is not available in the current environment.
const carts = new Map(); // userId -> cart object
const wishlists = new Map(); // userId -> products array

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Firebase Admin Initialization
let isFirebaseInitialized = false
try {
  const serviceAccount = JSON.parse(
    fs.readFileSync('./serviceAccountKey.json', 'utf8')
  )

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
  isFirebaseInitialized = true
  console.log('✅ Firebase Admin initialized successfully')
} catch (error) {
  console.error('❌ Firebase Admin initialization failed:', error.message)
}

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    ok: true, 
    firebase: isFirebaseInitialized,
    storage: 'In-Memory',
    message: 'Server is running'
  })
})

// Auth Middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] || req.headers.token;
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// --- CART ROUTES ---
app.get('/api/v1/cart', authMiddleware, (req, res) => {
  const userId = req.user.uid;
  if (!carts.has(userId)) {
    carts.set(userId, { products: [], totalCartPrice: 0 });
  }
  res.json({ status: 'success', numOfCartItems: carts.get(userId).products.length, data: carts.get(userId) });
});

app.post('/api/v1/cart', authMiddleware, (req, res) => {
  const userId = req.user.uid;
  const { productId, title, image, price } = req.body;
  
  if (!carts.has(userId)) carts.set(userId, { products: [], totalCartPrice: 0 });
  const cart = carts.get(userId);
  
  const itemIndex = cart.products.findIndex(p => p.productId === productId);
  if (itemIndex > -1) {
    cart.products[itemIndex].quantity += 1;
  } else {
    cart.products.push({ productId, title, image, price, quantity: 1 });
  }
  
  cart.totalCartPrice = cart.products.reduce((acc, p) => acc + (p.price * p.quantity), 0);
  res.json({ status: 'success', numOfCartItems: cart.products.length, data: cart });
});

app.put('/api/v1/cart/:productId', authMiddleware, (req, res) => {
  const userId = req.user.uid;
  const { productId } = req.params;
  const { count } = req.body;
  
  const cart = carts.get(userId);
  if (!cart) return res.status(404).json({ message: 'Cart not found' });
  
  const itemIndex = cart.products.findIndex(p => p.productId === productId);
  if (itemIndex > -1) {
    cart.products[itemIndex].quantity = count;
    cart.totalCartPrice = cart.products.reduce((acc, p) => acc + (p.price * p.quantity), 0);
    res.json({ status: 'success', numOfCartItems: cart.products.length, data: cart });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.delete('/api/v1/cart/:productId', authMiddleware, (req, res) => {
  const userId = req.user.uid;
  const { productId } = req.params;
  
  const cart = carts.get(userId);
  if (!cart) return res.status(404).json({ message: 'Cart not found' });
  
  cart.products = cart.products.filter(p => p.productId !== productId);
  cart.totalCartPrice = cart.products.reduce((acc, p) => acc + (p.price * p.quantity), 0);
  res.json({ status: 'success', numOfCartItems: cart.products.length, data: cart });
});

app.delete('/api/v1/cart', authMiddleware, (req, res) => {
  carts.set(req.user.uid, { products: [], totalCartPrice: 0 });
  res.json({ status: 'success', message: 'Cart cleared' });
});

// --- WISHLIST ROUTES ---
app.get('/api/v1/wishlist', authMiddleware, (req, res) => {
  const userId = req.user.uid;
  if (!wishlists.has(userId)) wishlists.set(userId, []);
  res.json({ status: 'success', count: wishlists.get(userId).length, data: wishlists.get(userId) });
});

app.post('/api/v1/wishlist', authMiddleware, (req, res) => {
  const userId = req.user.uid;
  const product = req.body;
  if (!wishlists.has(userId)) wishlists.set(userId, []);
  const wishlist = wishlists.get(userId);
  if (!wishlist.some(p => p.productId === product.productId)) {
    wishlist.push(product);
  }
  res.json({ status: 'success', data: wishlist.map(p => p.productId) });
});

app.delete('/api/v1/wishlist/:productId', authMiddleware, (req, res) => {
  const userId = req.user.uid;
  const { productId } = req.params;
  if (wishlists.has(userId)) {
    wishlists.set(userId, wishlists.get(userId).filter(p => p.productId !== productId));
  }
  res.json({ status: 'success', data: wishlists.get(userId).map(p => p.productId) });
});

// --- USER ROUTES ---
app.get('/api/v1/users/profile', authMiddleware, (req, res) => {
  res.json({ status: 'success', data: { _id: req.user.uid, name: req.user.name, email: req.user.email, role: 'user' } });
});

// --- ORDER ROUTES ---
app.get('/api/v1/orders/user/:userId', authMiddleware, (req, res) => {
  res.json([]); // Return empty orders for now
});

// Google auth exchange
app.post('/auth/google', async (req, res) => {
  try {
    if (!isFirebaseInitialized) return res.status(500).json({ success: false, message: 'Firebase not initialized' })
    const { firebaseToken } = req.body
    if (!firebaseToken) return res.status(400).json({ success: false, message: 'Missing token' })
    const decoded = await admin.auth().verifyIdToken(firebaseToken)
    const appToken = jwt.sign({ uid: decoded.uid, email: decoded.email, name: decoded.name }, process.env.JWT_SECRET || 'supersecretkey', { expiresIn: '7d' })
    return res.json({ success: true, token: appToken, user: { _id: decoded.uid, name: decoded.name, email: decoded.email, image: decoded.picture } })
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
