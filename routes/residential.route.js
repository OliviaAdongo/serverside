const express = require('express');
const Residential = require('../models/residential.model.js');
const router = express.Router();
const {getResidentials, getResidential, createResidential, updateResidential,deleteResidential} = require('../controllers/residential.contoller.js');



router.get('/', getResidentials);
router.get("/:id", getResidential);

router.post("/", createResidential);

// update a residential
router.put("/:id", updateResidential);

// delete a residential
router.delete("/:id", deleteResidential);

module.exports = router;