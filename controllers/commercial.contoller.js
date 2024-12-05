const Commercial = require("../models/commercial.model.js");
const path = require("path");

const getCommercials = async (req, res) => {
  try {
    const properties = await Commercial.find({});
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCommercial = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Commercial.findById(id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCommercial = async (req, res) => {
  try {
    const images = req.files ? req.files.map((file) => file.path) : [];
    const property = await Commercial.create({ ...req.body, images });
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCommercial = async (req, res) => {
  try {
    const { id } = req.params;
    const images = req.files ? req.files.map((file) => file.path) : [];

    const property = await Commercial.findByIdAndUpdate(
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

const deleteCommercial = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Commercial.findByIdAndDelete(id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCommercials,
  getCommercial,
  createCommercial,
  updateCommercial,
  deleteCommercial,
};
