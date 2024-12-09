const ResidentialLetting = require("../models/residentialletting.model.js");
const path = require("path");

const getResidentialLettings = async (req, res) => {
  try {
    const properties = await ResidentialLetting.find({});
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getResidentialLetting = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await ResidentialLetting.findById(id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createResidentialLetting = async (req, res) => {
  try {
    const images = req.files ? req.files.map((file) => file.path) : [];
    const property = await ResidentialLetting.create({ ...req.body, images });
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateResidentialLetting = async (req, res) => {
  try {
    const { id } = req.params;
    const images = req.files ? req.files.map((file) => file.path) : [];

    const property = await ResidentialLetting.findByIdAndUpdate(
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

const deleteResidentialLetting = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await ResidentialLetting.findByIdAndDelete(id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getResidentialLettings,
  getResidentialLetting,
  createResidentialLetting,
  updateResidentialLetting,
  deleteResidentialLetting,
};
