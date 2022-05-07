const supplierController = require('./supplier.controller.js')
const router = require('express').Router()

router.post('/new', supplierController.addSupplier);
router.get('/list', supplierController.getSuppliers);

module.exports = router;