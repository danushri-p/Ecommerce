const express = require('express');
const router = express.Router();
const verifyUser = require('../middlewares/jwt-verify.js');
const {
  GetUserOrdersController,
  CreateOrderController,
  CancelOrder,
  MarkOrderDelivered,
} = require('../controllers/order.controller.js');

router.get('/user-orders-data', verifyUser, GetUserOrdersController);
router.post('/confirm-order', verifyUser, CreateOrderController);

router.patch('/cancel-order', verifyUser, CancelOrder);

router.patch('/mark-delivered', verifyUser, MarkOrderDelivered);

module.exports = router;
