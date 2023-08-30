const express = require('express');
const router = express.Router();

const delayed = require("../models/delayed.js");

router.get('/', (req, res) => delayed.getDelayedTrains(req, res));

module.exports = router;
