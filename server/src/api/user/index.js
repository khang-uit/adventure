const router = require('express').Router();
const userController = require('./user.controller');

const { verifyToken } = require('../../middlewares/authMiddleware.js');
  

router.post('/donation', verifyToken, userController.postDonation)
router.get('/donation', verifyToken, userController.getDonation)
router.post('/voucher', verifyToken, userController.postVoucher)
router.get('/voucher', verifyToken, userController.getVoucher)
router.get('/', verifyToken, userController.getUser)
router.post('/edit', verifyToken, userController.updateUser)
router.post('/money', verifyToken, userController.postMoney);
router.get('/certificate/:id', userController.getCertificate);

module.exports = router;