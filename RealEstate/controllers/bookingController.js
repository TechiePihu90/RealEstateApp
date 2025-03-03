const Booking = require("../models/bookingModel");

const createBooking = async (req, res) => {
    try {
        console.log("Fetching bookings");
      const { property, message } = req.body;
      if (!property || !message) {
        return res.status(400).json({ message: "Property and message are required" });
    }
      const buyer = req.user ? req.user.id : null; // Ensure buyer is set
  
      if (!buyer) {
        return res.status(400).json({ message: "User not authenticated" });
      }
  
      const booking = new Booking({ property, buyer, message });
      await booking.save();
  
      res.status(201).json({ message: "Booking request sent successfully", booking });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

const getBookings = async (req, res) => {
  try {
    console.log("booking request running")
    const bookings = await Booking.find().populate("property").populate("buyer", "name email phone");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createBooking, getBookings };
