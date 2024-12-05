const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getCommercials,
  getCommercial,
  createCommercial,
  updateCommercial,
  deleteCommercial,
} = require("../controllers/commercial.contoller.js");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if ([".jpg", ".jpeg", ".png", ".gif"].includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only .jpg, .jpeg, .png, .gif files are allowed."));
    }
  },
});


router.get("/", getCommercials);
router.get("/:id", getCommercial);
router.post("/", upload.array("images", 10), createCommercial);
router.put("/:id", upload.array("images", 10), updateCommercial);
router.delete("/:id", deleteCommercial);

module.exports = router;
