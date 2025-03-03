const Property = require("../models/propertyModel");

const createProperty = async (req, res) => {
  try {
    console.log("Request Files:", req.files);

    const { title, description, price, location } = req.body;
    const owner = req.user._id;

    // ✅ Ensure unique file paths (prevent duplicates) & fix backslashes
    const images = [...new Set(req.files.map(file => file.path.replace(/\\/g, "/")))];

    const property = new Property({ title, description, price, location, images, owner });
    await property.save();

    res.status(201).json({ message: "Property listed successfully", property });
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({ message: "Failed to list property. Please try again." });
  }
};

const getProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate("owner", "name email phone");
    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: "Error fetching properties. Please try again." });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate("owner", "name email phone");
    if (!property) return res.status(404).json({ message: "Property not found" });
    
    res.status(200).json(property);
  } catch (error) {
    console.error("Error fetching property by ID:", error);
    res.status(500).json({ message: "Error fetching property details. Please try again." });
  }
};

const searchProperties = async (req, res) => {
  try {
    const locationQuery = req.params.location; // Get location from URL params
    const properties = await Property.find({ location: { $regex: locationQuery, $options: "i" } });

    res.status(200).json(properties);
  } catch (error) {
    console.error("Error searching properties:", error);
    res.status(500).json({ message: "Error searching properties. Please try again." });
  }
};


const deleteProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        // Check if the logged-in user is the owner
        if (String(property.owner) !== String(req.user._id)) {
            return res.status(403).json({ message: "Not authorized to delete this property" });
        }

        await property.deleteOne();
        res.json({ message: "Property deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};


module.exports = { createProperty, getProperties, 
  getPropertyById, searchProperties, deleteProperty};

