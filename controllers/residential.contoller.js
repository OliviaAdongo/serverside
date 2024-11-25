const Residential = require('../models/residential.model.js');



const getResidentials =  async (req, res) =>{


    try {
        const residentials = await Residential.find({});
        res.status(200).json(residentials);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}


const getResidential = async (req, res) => {
    try {
      const { id } = req.params;
      const residential = await Residential.findById(id);
      res.status(200).json(residential);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const createResidential = async (req, res) => {
    try {
      const residential = await Residential.create(req.body);
      res.status(200).json(residential);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const updateResidential = async (req, res) => {
    try {
      const { id } = req.params;
  
      const residential = await Residential.findByIdAndUpdate(id, req.body);
  
      if (!residential) {
        return res.status(404).json({ message: "Residential not found" });
      }
  
      const updatedResidential = await Residential.findById(id);
      res.status(200).json(updatedResidential);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const deleteResidential = async (req, res) => {
    try {
      const { id } = req.params;
  
      const residential = await Residential.findByIdAndDelete(id);
  
      if (!residential) {
        return res.status(404).json({ message: "Residential not found" });
      }
  
      res.status(200).json({ message: "Residential deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports ={
    getResidentials,
    getResidential,
    createResidential,
    updateResidential,
    deleteResidential
}