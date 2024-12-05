const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getResidentials,
  getResidential,
  createResidential,
  updateResidential,
  deleteResidential,
} = require("../controllers/residential.contoller.js");  

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

router.get("/", getResidentials);
router.get("/:id", getResidential);
router.post("/", upload.array("images", 10), createResidential);
router.put("/:id", upload.array("images", 10), updateResidential);
router.delete("/:id", deleteResidential);

module.exports = router;
