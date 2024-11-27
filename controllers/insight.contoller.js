const Insight = require("../models/insight.model.js");

const getInsights = async (req, res) => {
  try {
    const insights = await Insight.find({});
    res.status(200).json(insights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getInsight = async (req, res) => {
  try {
    const { id } = req.params;
    const insight = await Insight.findById(id);
    res.status(200).json(insight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createInsight = async (req, res) => {
  try {
    const insight = await Insight.create(req.body);
    res.status(200).json(insight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateInsight = async (req, res) => {
  try {
    const { id } = req.params;

    const insight = await Insight.findByIdAndUpdate(id, req.body);

    if (!insight) {
      return res.status(404).json({ message: "Insight not found" });
    }

    const updatedInsight = await Insight.findById(id);
    res.status(200).json(updatedInsight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteInsight = async (req, res) => {
  try {
    const { id } = req.params;

    const insight = await Insight.findByIdAndDelete(id);

    if (!insight) {
      return res.status(404).json({ message: "Insight not found" });
    }

    res.status(200).json({ message: "Insight deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getInsights,
  getInsight,
  createInsight,
  updateInsight,
  deleteInsight,
};
