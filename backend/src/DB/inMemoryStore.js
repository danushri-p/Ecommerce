const mongoose = require('mongoose');

const createId = () => new mongoose.Types.ObjectId().toString();

const buildSeedProducts = () => [
  {
    _id: createId(),
    title: 'Wireless Headphones',
    description: 'Immersive sound with 20-hour battery life.',
    rating: 4.5,
    discountedPrice: 1999,
    originalPrice: 2999,
    quantity: 12,
    category: 'male',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'],
    userEmail: 'seed@example.com',
  },
  {
    _id: createId(),
    title: 'Classic Sneakers',
    description: 'Comfortable everyday sneakers for casual wear.',
    rating: 4.2,
    discountedPrice: 1299,
    originalPrice: 1999,
    quantity: 8,
    category: 'female',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'],
    userEmail: 'seed@example.com',
  },
  {
    _id: createId(),
    title: 'Kid-Friendly Backpack',
    description: 'Durable backpack with lots of storage for school.',
    rating: 4.7,
    discountedPrice: 999,
    originalPrice: 1499,
    quantity: 15,
    category: 'kids',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'],
    userEmail: 'seed@example.com',
  },
];

const store = {
  users: [],
  products: buildSeedProducts(),
  carts: [],
  orders: [],
  payments: [],
};

const isFallbackActive = () => global.__DB_FALLBACK__ === true;

module.exports = { store, createId, isFallbackActive };
