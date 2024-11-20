const express = require("express");
const mongoose = require('mongoose');
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from SolidRoots NodeAPI server updated");
});

mongoose.connect("mongodb://adongoolivia0698:zrkNQIFCJXZwRDpe@backendd-shard-00-00.hjcwh.mongodb.net:27017,backendd-shard-00-01.hjcwh.mongodb.net:27017,backendd-shard-00-02.hjcwh.mongodb.net:27017/?ssl=true&replicaSet=atlas-x8k1ky-shard-0&authSource=admin&retryWrites=true&w=majority&appName=BackendD")
.then(()=>{
    console.log("Connected to database successfully!!");
    app.listen(3000, () => {
        console.log("Server listening on port 3000");
      });
})
.catch(()=> {
    console.log("Connection failed!");
});
