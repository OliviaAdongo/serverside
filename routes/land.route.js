const express = require('express');
const Land = require('../models/land.model.js');
const router = express.Router();
const {getLands, getLand, createLand, updateLand,deleteLand} = require('../controllers/land.contoller.js');



router.get('/', getLands);
router.get("/:id", getLand);

router.post("/", createLand);

// update a land
router.put("/:id", updateLand);

// delete a land
router.delete("/:id", deleteLand);

module.exports = router;