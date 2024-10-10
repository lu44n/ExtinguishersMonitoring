const express = require("express");
const router = express.Router();
const pg = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new pg.Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});

router.get("/extinguisher/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const result = await pool.query("SELECT * FROM extintores WHERE id = $1", [id]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Extintor não encontrado" });
      }
  
      res.json(result.rows[0]);
    } catch (error) {
      console.error("Erro ao buscar extintor:", error.message);
      res.status(500).json({ message: "Erro no servidor" });
    }
  });
  
  module.exports = router;