const router = require('express').Router();
const userController = require('./user.controller');

const { verifyToken } = require('../../middlewares/authMiddleware.js');
  

router.post('/donation', verifyToken, userController.postDonation) //api/user/orders
router.get('/donation', verifyToken, userController.getDonation) //api/user/orders
router.post('/voucher', verifyToken, userController.postVoucher) //api/user/orders
router.get('/voucher', verifyToken, userController.getVoucher) //api/user/orders
router.get('/', verifyToken, userController.getUser) //api/user/orders

module.exports = router;