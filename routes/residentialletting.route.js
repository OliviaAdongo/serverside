const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getResidentialLettings,
  getResidentialLetting,
  createResidentialLetting,
  updateResidentialLetting,
  deleteResidentialLetting,
 
} = require("../controllers/residentialletting.contoller.js");

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

router.get("/", getResidentialLettings);
router.get("/:id", getResidentialLetting);
router.post("/", upload.array("images", 10), createResidentialLetting);
router.put("/:id", upload.array("images", 10), updateResidentialLetting);
router.delete("/:id", deleteResidentialLetting);

module.exports = router;
