const express = require("express");
const Commercial = require("../models/commercial.model.js");
const router = express.Router();
const {
  getCommercials,
  getCommercial,
  createCommercial,
  updateCommercial,
  deleteCommercial,
} = require("../controllers/commercial.contoller.js");

router.get("/", getCommercials);
router.get("/:id", getCommercial);

router.post("/", createCommercial);

// update a commercial
router.put("/:id", updateCommercial);

// delete a commercial
router.delete("/:id", deleteCommercial);

module.exports = router;
