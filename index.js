const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const Land = require("./models/land.model.js");
const CommercialProperties = require("./models/commercial.model.js");
const ResidentialProperties = require("./models/residential.model.js");
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
// app.use('/api/products', productRoute);

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
app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE
app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// DELETE  PRODUCT

app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// ---------------------------------------- Trial CRUD end ----------------------------------------------------

// -------------------------------------------------------Land CRUD begin -------------------------------------------------

// POST
app.post("/api/lands", async (req, res) => {
  try {
    const land = await Land.create(req.body);
    res.status(200).json(land);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ
app.get("/api/lands", async (req, res) => {
  try {
    const lands = await Land.find({});
    res.status(200).json(lands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// by id
app.get("/api/lands/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const land = await Land.findById(id);
    res.status(200).json(land);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE
app.put("/api/lands/:id", async (req, res) => {
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
});
// DELETE  LAND

app.delete("/api/lands/:id", async (req, res) => {
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
});
// -------------------------------------------------------Land CRUD end -------------------------------------------------

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------Commercial Properties CRUD beginning -------------------------------------------------
// POST
app.post("/api/commercialproperties", async (req, res) => {
  try {
    const commercialproperty = await CommercialProperties.create(req.body);
    res.status(200).json(commercialproperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ
app.get("/api/commercialproperties", async (req, res) => {
  try {
    const commercialproperties = await CommercialProperties.find({});
    res.status(200).json(commercialproperties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// by id
app.get("/api/commercialproperties/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const commercialproperty = await Land.findById(id);
    res.status(200).json(commercialproperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE
app.put("/api/commercialproperties/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const commercialproperty = await CommercialProperties.findByIdAndUpdate(id, req.body);

    if (!commercialproperty) {
      return res.status(404).json({ message: "CommercialProperties not found" });
    }
    const updatedLand = await CommercialProperties.findById(id);
    res.status(200).json(updatedCommercialProperties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// DELETE  LAND

app.delete("/api/commercialproperties/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const commercialproperty = await CommercialProperties.findByIdAndDelete(id);

    if (!commercialproperty) {
      return res.status(404).json({ message: "CommercialProperties not found" });
    }
    res.status(200).json({ message: "CommercialProperties deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// -------------------------------------------------------Commercial Properties  CRUD end -------------------------------------------------

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------Residential Properties CRUD beginning -------------------------------------------------
// POST
app.post("/api/residentialproperties", async (req, res) => {
  try {
    const residentialproperty = await ResidentialProperties.create(req.body);
    res.status(200).json(residentialproperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ
app.get("/api/residentialproperties", async (req, res) => {
  try {
    const residentialproperties = await ResidentialProperties.find({});
    res.status(200).json(residentialproperties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// by id
app.get("/api/residentialproperties/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const residentialproperty = await Land.findById(id);
    res.status(200).json(residentialproperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE
app.put("/api/residentialproperties/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const residentialproperty = await ResidentialProperties.findByIdAndUpdate(id, req.body);

    if (!residentialproperty) {
      return res.status(404).json({ message: "ResidentialProperties not found" });
    }
    const updatedLand = await ResidentialProperties.findById(id);
    res.status(200).json(updatedResidentialProperties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// DELETE 

app.delete("/api/residentialproperties/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const residentialproperty = await ResidentialProperties.findByIdAndDelete(id);

    if (!residentialproperty) {
      return res.status(404).json({ message: "ResidentialProperties not found" });
    }
    res.status(200).json({ message: "ResidentialProperties deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// -------------------------------------------------------Residential Properties  CRUD end -------------------------------------------------

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------  Insights CRUD beginning -------------------------------------------------
// ------------------------------------------------------- Insights   CRUD end -------------------------------------------------

// MONGOSE DB CONNECTION
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
