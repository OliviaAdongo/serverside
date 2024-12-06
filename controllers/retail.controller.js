const Retail = require("../models/retail.model.js");
const path = require("path");

const getRetails = async (req, res) => {
  try {
    const properties = await Retail.find({});
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRetail = async (req, res) => {
  try { 
    const { id } = req.params;
    const property = await Retail.findById(id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createRetail = async (req, res) => {
  try {
    const images = req.files ? req.files.map((file) => file.path) : [];
    const property = await Retail.create({ ...req.body, images });
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRetail = async (req, res) => {
  try {
    const { id } = req.params;
    const images = req.files ? req.files.map((file) => file.path) : [];

    const property = await Retail.findByIdAndUpdate(
      id,
      { ...req.body, images },
      { new: true }
    );

    if (!property) return res.status(404).json({ message: "Property not found" });
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteRetail = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Retail.findByIdAndDelete(id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getRetails,
  getRetail,
  createRetail,
  updateRetail,
  deleteRetail,
};
