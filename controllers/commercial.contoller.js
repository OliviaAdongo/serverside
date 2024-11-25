const Commercial = require('../models/commercial.model.js');



const getCommercials =  async (req, res) =>{


    try {
        const commercials = await Commercial.find({});
        res.status(200).json(commercials);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}


const getCommercial = async (req, res) => {
    try {
      const { id } = req.params;
      const commercial = await Commercial.findById(id);
      res.status(200).json(commercial);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const createCommercial = async (req, res) => {
    try {
      const commercial = await Commercial.create(req.body);
      res.status(200).json(commercial);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const updateCommercial = async (req, res) => {
    try {
      const { id } = req.params;
  
      const commercial = await Commercial.findByIdAndUpdate(id, req.body);
  
      if (!commercial) {
        return res.status(404).json({ message: "Commercial not found" });
      }
  
      const updatedCommercial = await Commercial.findById(id);
      res.status(200).json(updatedCommercial);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const deleteCommercial = async (req, res) => {
    try {
      const { id } = req.params;
  
      const commercial = await Commercial.findByIdAndDelete(id);
  
      if (!commercial) {
        return res.status(404).json({ message: "Commercial not found" });
      }
  
      res.status(200).json({ message: "Commercial deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports ={
    getCommercials,
    getCommercial,
    createCommercial,
    updateCommercial,
    deleteCommercial
}