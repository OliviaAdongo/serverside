const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from SolidRoots NodeAPI server updated");
});
// POST
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// by id
app.get("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb://adongoolivia0698:zrkNQIFCJXZwRDpe@backendd-shard-00-00.hjcwh.mongodb.net:27017,backendd-shard-00-01.hjcwh.mongodb.net:27017,backendd-shard-00-02.hjcwh.mongodb.net:27017/?ssl=true&replicaSet=atlas-x8k1ky-shard-0&authSource=admin&retryWrites=true&w=majority&appName=BackendD"
  )
  .then(() => {
    console.log("Connected to database successfully!!");
    app.listen(3000, () => {
      console.log("Server listening on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });
