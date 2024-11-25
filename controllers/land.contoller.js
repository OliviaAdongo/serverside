const Land = require('../models/land.model.js');



const getLands =  async (req, res) =>{


    try {
        const lands = await Land.find({});
        res.status(200).json(lands);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}


const getLand = async (req, res) => {
    try {
      const { id } = req.params;
      const land = await Land.findById(id);
      res.status(200).json(land);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const createLand = async (req, res) => {
    try {
      const land = await Land.create(req.body);
      res.status(200).json(land);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const updateLand = async (req, res) => {
    try {
      const { id } = req.params;
  
      const land = await Land.findByIdAndUpdate(id, req.body);
  
      if (!land) {
        return res.status(404).json({ message: "Land not found" });
      }
  
      const updatedLand = await Land.findById(id);
      res.status(200).json(updatedLand);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const deleteLand = async (req, res) => {
    try {
      const { id } = req.params;
  
      const land = await Land.findByIdAndDelete(id);
  
      if (!land) {
        return res.status(404).json({ message: "Land not found" });
      }
  
      res.status(200).json({ message: "Land deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports ={
    getLands,
    getLand,
    createLand,
    updateLand,
    deleteLand
}