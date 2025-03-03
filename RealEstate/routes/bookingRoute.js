const express = require("express");
const { createBooking, getBookings } = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a booking request (Protected Route)
router.post("/", protect, createBooking);

// Get all bookings (Admin or seller can access)
router.get("/",  getBookings);

module.exports = router;
