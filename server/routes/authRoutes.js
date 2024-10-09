const express = require("express");
// const bcrypt = require("bcrypt");
const router = express.Router(); 
const pg = require("pg");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const pool = new pg.Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});

router.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const result = await pool.query("SELECT * FROM users WHERE username = $1", [
        username
      ]);
  
      const user = result.rows[0];
      if (!user || user.password !== password) {
        return res.status(400).json({ message: "Usuário ou Senha Inválidos!" });
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

module.exports = router;