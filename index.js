const cors = require('cors');
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const multer = require("multer"); // Import multer
const path = require("path");

// Import models
const Product = require("./models/product.model.js");
const Land = require("./models/land.model.js");
const Commercial = require("./models/commercial.model.js");
const Retail = require("./models/retail.model.js");
const Residential = require("./models/residential.model.js");
const Insight = require("./models/insight.model.js");

// Import routes
const productRoute = require("./routes/product.route.js");
const landRoute = require("./routes/land.route.js");
const residentialRoute = require("./routes/residential.route.js");
const retailRoute = require("./routes/retail.route.js");
const commercialRoute = require("./routes/commercial.route.js");
const insightsRoute = require("./routes/insights.route.js");
const authRoutes = require("./routes/auth.route.js");

const app = express(); 
const PORT = 3000;

// MongoDB connection string and session secret
const MONGO_URI = "mongodb://adongoolivia0698:zrkNQIFCJXZwRDpe@backendd-shard-00-00.hjcwh.mongodb.net:27017,backendd-shard-00-01.hjcwh.mongodb.net:27017,backendd-shard-00-02.hjcwh.mongodb.net:27017/?ssl=true&replicaSet=atlas-x8k1ky-shard-0&authSource=admin&retryWrites=true&w=majority&appName=BackendD";
const SESSION_SECRET = "hardcoded-secret-key";

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public/uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ dest: 'uploads' }) // Configure multer

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(__dirname + '/public'));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middleware for checking if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next(); // Proceed to the next middleware or route handler
  }
  res.redirect("/login.html"); // Redirect to login if not authenticated
}

// Session configuration
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

// Routes
app.use("/api/products", productRoute);
app.use("/api/lands", landRoute);
app.use("/api/residentialproperties", residentialRoute);
app.use("/api/commercialproperties", commercialRoute);
app.use("/api/retailproperties", retailRoute);
app.use("/api/insights", insightsRoute);
app.use("/auth", authRoutes);

// Protect dashboard route
// app.get("/adash.html", (req, res) => {
//   if (!req.session.user) {
//     return res.redirect("/login.html");
//   }
//   res.sendFile(path.join(__dirname, "views", "adash.html"));
// });
// Protect all views requiring authentication
app.get("/adash.html", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "adash.html"));
});

app.get("/create_commercial.html", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "create_commercial.html"));
});

app.get("/create_land.html", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "create_land.html"));
});

app.get("/create_residential.html", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "create_residential.html"));
});

app.get("/insights.html", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "insights.html"));
});

app.get("/create_retail.html", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "create_retail.html"));
});

// Serve frontend pages
app.get("/register.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "register.html"));
});
app.get("/login.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

// Set template engine
app.set("view engine", "ejs");

// Test route
app.get("/", (req, res) => {
  res.send("Hello from SolidRoots NodeAPI server updated");
});

// CRUD operations for Products
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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

// CRUD operations for Land
app.post("/api/lands", upload.array("images", 10), async (req, res) => {
  try {
    const { location, price, category, description, status, agent } = req.body;
    const images = req.files.map((file) => `/uploads/${file.filename}`);

    if (images.length < 1 || images.length > 10) {
      return res.status(400).json({ message: "You must upload between 1 and 10 images." });
    }

    const land = await Land.create({
      images,
      location,
      price,
      category,
      description,
      status,
      agent,
    });

    res.status(201).json(land);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/lands", async (req, res) => {
  try {
    const lands = await Land.find({});
    res.status(200).json(lands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/lands/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const land = await Land.findById(id);
    res.status(200).json(land);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/lands/:id", upload.array("images", 10), async (req, res) => {
  try {
    const { id } = req.params;
    const { location, price, category, description, status, agent } = req.body;
    const images = req.files.map((file) => `/uploads/${file.filename}`);

    const updateData = { location, price, category, description, status, agent };
    if (images.length > 0) {
      if (images.length > 10) {
        return res.status(400).json({ message: "You can upload a maximum of 10 images." });
      }
      updateData.images = images;
    }

    const land = await Land.findByIdAndUpdate(id, updateData, { new: true });

    if (!land) {
      return res.status(404).json({ message: "Land not found" });
    }

    res.status(200).json(land);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });
