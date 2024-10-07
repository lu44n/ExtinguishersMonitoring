const express = require("express");
// const bcrypt = require("bcrypt");
const cors = require("cors"); 
const pg = require("pg");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());

const port = process.env.PORT || 4000;

const pool = new pg.Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});

app.use(express.json());

app.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const result = await pool.query("SELECT * FROM users WHERE username = $1", [
        username
      ]);
  
      const user = result.rows[0];
      if (!user || user.password !== password) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
  
    //   const isPasswordMatch = await bcrypt.compare(password, user.password);
    //   if (!isPasswordMatch) {
    //     return res.status(400).json({ message: "Invalid Credentials" });
    //   }
  
      const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
  
      res.json({ token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  });

function verifyToken (req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status (401).json({ message: "Missing token" });
    }
    try {
        const decoded = jwt.verify (token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Token verification failed:", error.message);
        res.status(401).json({ message: "Invalid token" });
    }
}

app.get("/userinfo", verifyToken, (req, res) => {
    res.json({user: req.user });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});