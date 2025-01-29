const express = require('express');
const multer = require('multer');
const {
  CreateUSer,
  verifyUserController,
  signup,
  login,
  getUSerData,
  AddAddressController,
  DeleteAddyController,
  GetAddressController,

} = require('../controllers/user.controller.js');
const jwt = require('jsonwebtoken');
const verifyUser = require('../middlewares/jwt-verify.js');
const upload = multer({ dest: 'temp-uploads/' });
const router = express.Router();

router.post('/create-user', upload.single('file'), CreateUSer);
router.get('/activation/:token', verifyUserController);

router.post('/signup', upload.single('file'), signup);
router.post('/login', login);

router.get('/user-data', verifyUser, getUSerData);

router.post('/add-address', verifyUser, AddAddressController);

router.delete('/delete-address/:id',verifyUser, DeleteAddyController)

router.post('/get-address', verifyUser, GetAddressController);
module.exports = router;