const express = require("express");
const multer = require("multer");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/userModel");
const Property = require("../models/propertyModel");

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Store images in "uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// GET /api/profile - Fetch user details and their properties
router.get("/", protect, async (req, res) => {
    try {
        // Fetch user details (excluding password)
        const user = await User.findById(req.user.id).select("-password");
        console.log("Fetched User:", user);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Fetch properties created by this user
        const properties = await Property.find({ owner: req.user.id }).select("title location image"); 

        res.json({ user, properties });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// POST /api/profile/upload-profile-pic - Upload & update profile picture
router.post("/upload-profile-pic", protect, upload.single("profilePic"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Construct the image URL
        const imageUrl = `/uploads/${req.file.filename}`;

        // Update user profile picture
        const user = await User.findByIdAndUpdate(req.user.id, { profilePic: imageUrl }, { new: true }).select("-password");

        res.json({ success: true, message: "Profile picture updated!", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error uploading profile picture" });
    }
});

module.exports = router;
