const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getRetails,
  getRetail,
  createRetail,
  updateRetail,
  deleteRetail,
} = require("../controllers/retail.controller.js");

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

router.get("/", getRetails);
router.get("/:id", getRetail);
router.post("/", upload.array("images", 10), createRetail);
router.put("/:id", upload.array("images", 10), updateRetail);
router.delete("/:id", deleteRetail);

module.exports = router;
