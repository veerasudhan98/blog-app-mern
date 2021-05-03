// Main starting point of the application
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = require("./router");
const mongoose = require("mongoose");
// const cors = require('cors');  // we don't need it anymore, because we use proxy server instead

// DB Setup (connect mongoose and instance of mongodb)
//Database connection
mongoose
  .connect(
    process.env.MONGODB_URL ||
      "mongodb+srv://karthik-blog-app:karthik@98@cluster0.dud0j.mongodb.net/test",
    { useNewUrlParser: true, useUnifiedTopology: true, useMongoClient: true }
  )
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));
// App Setup (morgan and body-parser are middleware in Express)
app.use(morgan("combined")); // middleware for logging
app.use(bodyParser.json({ type: "*/*" })); // middleware for helping parse incoming HTTP requests
// app.use(cors());  // middleware for circumventing (规避) cors error

// Router Setup
router(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));
}

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on: ", port);
