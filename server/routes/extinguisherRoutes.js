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

router.get("/extinguishers", async (req, res) => {
  try {
    const currentDate = new Date();
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(currentDate.getMonth() + 1); 

    const allExtinguishersQuery = 'SELECT * FROM extintores';
    const { rows: extinguishers } = await pool.query(allExtinguishersQuery);

    const totalExtinguishers = extinguishers.length;

    const nearMaintenance = extinguishers.filter(ext => {
      return new Date(ext.proxima_inspecao) <= oneMonthFromNow;
    });

    const alertStatus = extinguishers.filter(ext => ext.status === 'alerta' || ext.status === 'Alerta' || ext.status === 'ALERTA');

    res.json({
      total: totalExtinguishers,
      nearMaintenance: nearMaintenance.length,
      alertStatus: alertStatus.length,
      extinguishers: {
        all: extinguishers,
        nearMaintenance,
        alertStatus
      }
    });
  } catch (error) {
    console.error('Erro ao buscar extintores:', error);
    res.status(500).json({ error: 'Erro ao buscar extintores' });
  }
});

router.post("/extinguisher", async (req, res) => {
  const { tipo, capacidade, codigo_fabricante, data_fabricacao, data_validade, ultima_recarga, proxima_inspecao, status, localizacao } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO extintores (tipo, capacidade, codigo_fabricante, data_fabricacao, data_validade, ultima_recarga, proxima_inspecao, status, localizacao) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [tipo, capacidade, codigo_fabricante, data_fabricacao, data_validade, ultima_recarga, proxima_inspecao, status, localizacao]
    );

    res.status(201).json(result.rows[0]); 
  } catch (error) {
    console.error("Erro ao criar extintor:", error.message);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

router.delete("/extinguisher/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM extintores WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Extintor não encontrado" });
    }

    res.status(200).json(result.rows[0]); 
  } catch (error) {
    console.error("Erro ao deletar extintor:", error.message);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

module.exports = router;