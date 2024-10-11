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

  router.put("/extinguisher/:id", async (req, res) => {
    const { id } = req.params;
    const { tipo, capacidade, codigo_fabricante, data_fabricacao, data_validade, ultima_recarga, proxima_inspecao, status, localizacao } = req.body;
  
    try {
      const result = await pool.query(
        `UPDATE extintores 
        SET tipo = $1, capacidade = $2, codigo_fabricante = $3, data_fabricacao = $4, data_validade = $5, ultima_recarga = $6, proxima_inspecao = $7, status = $8, localizacao = $9 
        WHERE id = $10 RETURNING *`,
        [tipo, capacidade, codigo_fabricante, data_fabricacao, data_validade, ultima_recarga, proxima_inspecao, status, localizacao, id]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Extintor não encontrado" });
      }
  
      res.json(result.rows[0]);
    } catch (error) {
      console.error("Erro ao atualizar extintor:", error.message);
      res.status(500).json({ message: "Erro no servidor" });
    }
  });
  
  module.exports = router;