//Init express & router
const express = require("express");
const router = express.Router();

const path = require("path");

router.use(express.static(path.join(__dirname, 'public')));
router.use(require("./auth"));

module.exports = router;