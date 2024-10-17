const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const dotenv = require("dotenv");
const extinguisherRoutes = require("./routes/extinguisherRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;

app.use("/auth", authRoutes);
app.use("/api", extinguisherRoutes)

module.exports = app;