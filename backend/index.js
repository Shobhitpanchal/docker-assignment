const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

// Table create
pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT
  );
`).catch(err => console.log(err));

// POST API
app.post('/add', async (req, res) => {
  const { name } = req.body;
  await pool.query('INSERT INTO users(name) VALUES($1)', [name]);
  res.send("User added");
});

// GET API
app.get('/users', async (req, res) => {
  const result = await pool.query('SELECT * FROM users');
  res.json(result.rows);
});

// Health check
app.get('/health', (req, res) => {
  res.send("OK");
});

app.listen(3000, () => console.log("Server running on port 3000"));