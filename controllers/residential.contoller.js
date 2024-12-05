const Residential = require("../models/residential.model.js");
const path = require("path");

const getResidentials = async (req, res) => {
  try {
    const properties = await Residential.find({});
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getResidential = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Residential.findById(id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createResidential = async (req, res) => {
  try {
    const images = req.files ? req.files.map((file) => file.path) : [];
    const property = await Residential.create({ ...req.body, images });
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateResidential = async (req, res) => {
  try {
    const { id } = req.params;
    const images = req.files ? req.files.map((file) => file.path) : [];

    const property = await Residential.findByIdAndUpdate(
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

const deleteResidential = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Residential.findByIdAndDelete(id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getResidentials,
  getResidential,
  createResidential,
  updateResidential,
  deleteResidential,
};
