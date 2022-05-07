const voucherController = require('./voucher.controller.js')
const router = require('express').Router()

router.get('/search', voucherController.getVouchersBySearch);
router.get('/category/:category', voucherController.getVouchersByCategory);
router.get('/list', voucherController.getVouchers)
router.post('/new', voucherController.addVoucher)
router.post('/newcode', voucherController.addVoucherCode)
// router.post('/edit/:id', voucherController.updateVoucher)
// router.post('/delete/:id', voucherController.deleteVoucher)

module.exports = router;