const cors = require('cors');
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const multer = require("multer"); // Import multer
const path = require("path");


// Import models

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
const insightsRoute = require("./routes/insights.route.js")
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

// const upload = multer({ dest: 'uploads' }) // Configure multer
// Initialize multer with the storage configuration (no 'dest' property here)
const upload = multer({ storage: storage });

// Middleware
app.use(cors({
  origin: '*', // Allow frontend origin (adjust for your frontend URL)
  methods: ['GET', 'POST', 'PUT'], // Allow only the necessary methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
  credentials: true, // Allows cookies to be sent if needed
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "public/uploads"), {
  setHeaders: (res, filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    let mimeType = 'application/octet-stream';

    if (ext === '.jpg' || ext === '.jpeg') mimeType = 'image/jpeg';
    else if (ext === '.png') mimeType = 'image/png';
    else if (ext === '.gif') mimeType = 'image/gif';

    // Set the Content-Type header based on the file extension
    res.setHeader('Content-Type', mimeType);

    // Allow cross-origin requests for images
    res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all origins (use specific origin in production)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }
}));

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
app.get("/admin.html", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "admin.html"));
});

app.get("/create_residential.html", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "create_residential.html"));
});
app.get("/residentiallettings.html", isAuthenticated, (req, res) => {
  console.log("Request for residentiallettings.html received");
  res.sendFile(path.join(__dirname, "views", "residentiallettings.html"));
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
app.set("view engine", "html");

// Test route
app.get("/", (req, res) => {
  res.send("Hello from SolidRoots NodeAPI server updated");
});




// -------------------------------------------------------Land CRUD begin -------------------------------------------------

// POST
// Land CRUD with image upload
// Create a new land entry
app.post("/api/lands", upload.array("images", 10), async (req, res) => {
  try {
    const { location, propertyname, size, price, category, description, status, amenities, agent } = req.body;
    const images = req.files.map((file) => `/uploads/${file.filename}`);

    if (images.length < 1 || images.length > 10) {
      return res.status(400).json({ message: "You must upload between 1 and 10 images." });
    }

    const land = await Land.create({
      images,
      location,
      propertyname,
      size,
      price,
      category,
      description,
      status, 
      amenities,
      agent,
    });

    res.status(201).json(land);
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

// Update an existing land entry
app.put("/api/lands/:id", upload.array("images", 10), async (req, res) => {
  try {
    const { id } = req.params;
    const { location, propertyname, size, price, category, description, status, amenities, agent } = req.body;
    const images = req.files.map((file) => `/uploads/${file.filename}`);

    const updateData = { location, propertyname, size, price, category, description, status, amenities, agent };
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
// Commercial Properties POST (with image upload)
app.post("/api/commercialproperties", upload.array("images", 10), async (req, res) => {
  try {
    const { location, propertyname, size, price, category, description, status, agent, amenities } = req.body;
    const images = req.files.map((file) => `/uploads/${file.filename}`);

    if (images.length < 1 || images.length > 10) {
      return res.status(400).json({ message: "You must upload between 1 and 10 images." });
    }

    const commercial = await Commercial.create({
      images,
      location,
      propertyname,
      size,
      price,
      category,
      description,
      status,
      agent,
      amenities,
    }); 

    res.status(201).json(commercial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Commercial Properties GET (all)
app.get("/api/commercialproperties", async (req, res) => {
  try {
    const commercialProperties = await Commercial.find({});
    res.status(200).json(commercialProperties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Commercial Properties GET by ID
app.get("/api/commercialproperties/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const commercialProperty = await Commercial.findById(id);
    res.status(200).json(commercialProperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Commercial Properties PUT (update)
app.put("/api/commercialproperties/:id", upload.array("images", 10), async (req, res) => {
  try {
    const { id } = req.params;
    const { location,propertyname, size, price, category, description, status,  agent, amenities } = req.body;
    const images = req.files.map((file) => `/uploads/${file.filename}`);

    const updateData = { location, propertyname, size, price, category, description, status, agent, amenities };
    if (images.length > 0) {
      if (images.length > 10) {
        return res.status(400).json({ message: "You can upload a maximum of 10 images." });
      }
      updateData.images = images;
    }

    const commercial = await Commercial.findByIdAndUpdate(id, updateData, { new: true });

    if (!commercial) {
      return res.status(404).json({ message: "Commercial property not found" });
    }

    res.status(200).json(commercial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Commercial Properties DELETE
app.delete("/api/commercialproperties/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const commercial = await Commercial.findByIdAndDelete(id);

    if (!commercial) {
      return res.status(404).json({ message: "Commercial property not found" });
    }
    res.status(200).json({ message: "Commercial property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// -------------------------------------------------------Commercial Properties  CRUD end -------------------------------------------------

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------Residential Properties CRUD beginning -------------------------------------------------
// POST
// Residential Properties POST (with image upload)
app.post("/api/residentialproperties", upload.array("images", 10), async (req, res) => {
  try {
    const { location, propertyname, size, price, category, description, status, agent, amenities } = req.body;
    const images = req.files.map((file) => `/uploads/${file.filename}`);

    if (images.length < 1 || images.length > 10) {
      return res.status(400).json({ message: "You must upload between 1 and 10 images." });
    }

    const residential = await Residential.create({
      images,
      location,
      propertyname,
      size,
      price,
      category,
      description,
      status,
      agent,
      amenities,
    });

    res.status(201).json(residential);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Residential Properties GET (all)
app.get("/api/residentialproperties", async (req, res) => {
  try {
    const residentialProperties = await Residential.find({});
    res.status(200).json(residentialProperties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Residential Properties GET by ID
app.get("/api/residentialproperties/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const residentialProperty = await Residential.findById(id);
    res.status(200).json(residentialProperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Residential Properties PUT (update)
app.put("/api/residentialproperties/:id", upload.array("images", 10), async (req, res) => {
  try {
    const { id } = req.params;
    const { location,propertyname, size, price, category, description, status, agent, amenities } = req.body;
    const images = req.files.map((file) => `/uploads/${file.filename}`);

    const updateData = { location, propertyname, size, price, category, description, status, agent, amenities };
    if (images.length > 0) {
      if (images.length > 10) {
        return res.status(400).json({ message: "You can upload a maximum of 10 images." });
      }
      updateData.images = images;
    }

    const residential = await Residential.findByIdAndUpdate(id, updateData, { new: true });

    if (!residential) {
      return res.status(404).json({ message: "Residential property not found" });
    }

    res.status(200).json(residential);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Residential Properties DELETE
app.delete("/api/residentialproperties/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const residential = await Residential.findByIdAndDelete(id);

    if (!residential) {
      return res.status(404).json({ message: "Residential property not found" });
    }
    res.status(200).json({ message: "Residential property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// -------------------------------------------------------Residential Properties  CRUD end -------------------------------------------------


// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------  Insight CRUD beginning -------------------------------------------------
// POST
app.post("/api/insights", async (req, res) => {
  try {
    const blogInsight = await Insight.create(req.body);
    res.status(200).json(blogInsight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ
app.get("/api/insights", async (req, res) => {
  try {
    const insights = await Insight.find({});
    res.status(200).json(insights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// by id
app.get("/api/insights/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blogInsight = await Insight.findById(id);
    res.status(200).json(blogInsight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE
app.put("/api/insights/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const blogInsight = await Insight.findByIdAndUpdate(id, req.body);

    if (!blogInsight) {
      return res.status(404).json({ message: "Insight not found" });
    }
    const updatedInsight = await Insight.findById(id);
    res.status(200).json(updatedInsight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// DELETE  LAND

app.delete("/api/insights/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blogInsight = await Insight.findByIdAndDelete(id);

    if (!blogInsight) {
      return res.status(404).json({ message: "Insight not found" });
    }
    res.status(200).json({ message: "Insight deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// ------------------------------------------------------- Insight   CRUD end -------------------------------------------------
// ------------------------------------------------------- Retail   CRUD start -------------------------------------------------

// Retail Properties POST (with image upload)
app.post("/api/retailproperties", upload.array("images", 10), async (req, res) => {
  try {
    const { location, propertyname, size, price, category, description, status, agent, amenities } = req.body;
    const images = req.files.map((file) => `/uploads/${file.filename}`);

    if (images.length < 1 || images.length > 10) {
      return res.status(400).json({ message: "You must upload between 1 and 10 images." });
    }

    const retail = await Retail.create({
      images,
      location,
      propertyname,
      size,
      price,
      category,
      description,
      status,
      agent,
      amenities,
    });

    res.status(201).json(retail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Retail Properties GET (all)
app.get("/api/retailproperties", async (req, res) => {
  try {
    const retailProperties = await Retail.find({});
    res.status(200).json(retailProperties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Retail Properties GET by ID
app.get("/api/retailproperties/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const retailProperty = await Retail.findById(id);
    res.status(200).json(retailProperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Retail Properties PUT (update)
app.put("/api/retailproperties/:id", upload.array("images", 10), async (req, res) => {
  try {
    const { id } = req.params;
    const { location,propertyname, size, price, category, description, status, agent, amenities } = req.body;
    const images = req.files.map((file) => `/uploads/${file.filename}`);

    const updateData = { location, propertyname, size, price, category, description, status, agent,amenities };
    if (images.length > 0) {
      if (images.length > 10) {
        return res.status(400).json({ message: "You can upload a maximum of 10 images." });
      }
      updateData.images = images;
    }

    const retail = await Retail.findByIdAndUpdate(id, updateData, { new: true });

    if (!retail) {
      return res.status(404).json({ message: "Retail property not found" });
    }

    res.status(200).json(retail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Retail Properties DELETE
app.delete("/api/retailproperties/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const retail = await Retail.findByIdAndDelete(id);

    if (!retail) {
      return res.status(404).json({ message: "Retail property not found" });
    }
    res.status(200).json({ message: "Retail property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ------------------------------------------------------- Retail  CRUD end -------------------------------------------------

// Connect to MongoDB and start the server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to database successfully!");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });