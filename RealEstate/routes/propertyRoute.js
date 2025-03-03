const express = require("express");
const { 
  createProperty, 
  getProperties, 
  getPropertyById, 
  searchProperties, 
  deleteProperty
} = require("../controllers/propertyController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware"); // ✅ Import multer middleware

const router = express.Router();

// ✅ Search route pehle rakho taaki conflict na ho
router.get("/search/:location", searchProperties);

// ✅ Upload images while creating property (with authentication)
router.post("/", protect, upload.array("images", 5), createProperty);

// ✅ Get all properties
router.get("/", getProperties);

// ✅ Get a property by ID
router.get("/:id", getPropertyById);

router.delete("/:id", protect, deleteProperty);

module.exports = router;







