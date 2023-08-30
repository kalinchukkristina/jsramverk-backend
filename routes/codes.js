const express = require('express');
const router = express.Router();

const codes = require("../models/codes.js");

router.get('/', (req, res) => codes.getCodes(req, res));

module.exports = router;
