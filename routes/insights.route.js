const express = require('express');
const Insight = require('../models/insight.model.js');
const router = express.Router();
const {getInsights, getInsight, createInsight, updateInsight,deleteInsight} = require('../controllers/insight.contoller.js');



router.get('/', getInsights);
router.get("/:id", getInsight);

router.post("/", createInsight);

// update a insight
router.put("/:id", updateInsight);

// delete a insight
router.delete("/:id", deleteInsight);

module.exports = router;