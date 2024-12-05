const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getLands,
  getLand,
  createLand,
  updateLand,
  deleteLand,
} = require("../controllers/land.contoller.js");

const router = express.Router();

// Set up Multer for file storage
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

router.get("/", getLands);
router.get("/:id", getLand);
router.post("/", upload.array("images", 10), createLand);
router.put("/:id", upload.array("images", 10), updateLand);
router.delete("/:id", deleteLand);

module.exports = router;
