const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/jwt-verify.js');
const {
  GetUserOrdersController,
  CreateOrderController,
} = require('../controllers/order.controller.js');

router.get('/user-orders-data', verifyToken, GetUserOrdersController);
router.post('/confirm-order', verifyToken, CreateOrderController);

module.exports = router;