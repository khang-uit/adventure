
const router = require("express").Router();

//import module
const user = require("./user");
const voucher = require("./voucher");
const donation = require("./donation");
const auth = require("./auth");

//routing
router.use("/auth", auth);
router.use("/user", user);
router.use("/voucher", voucher);
router.use("/donation", donation);

module.exports = router;
