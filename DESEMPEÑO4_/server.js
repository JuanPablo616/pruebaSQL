// server.js
// CRUD simple con MySQL, carga inicial desde users.csv
// Librerías: mysql2, fs, csv-parser, express, cors (import ESM)

import mysql from 'mysql2';
import fs from 'fs';
import csv from 'csv-parser';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Sirve archivos estáticos desde /public

// Configuración de conexión a MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'TuNuevaContraseña',
  database: 'pd_JuanP_rojas_lovelace'
});

// Conectar a la base de datos y preparar tabla
connection.connect(err => {
  if (err) {
    console.error('Error conectando a MySQL:', err);
    process.exit(1);
  }
  console.log('Conectado a MySQL');

  // Crear tabla si no existe
  const createTableSql = `
    CREATE TABLE IF NOT EXISTS clients (
      client_id INT PRIMARY KEY,
      full_name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      phone VARCHAR(20)
    )
  `;
  connection.query(createTableSql, (err) => {
    if (err) {
      console.error('Error creando tabla clients:', err);
      return;
    }

    // Cargar datos desde CSV (solo si hay archivo data1.csv en la raíz)
    const csvPath = 'data1.csv';
    if (fs.existsSync(csvPath)) {
      fs.createReadStream(csvPath)
        .pipe(csv())
        .on('data', (row) => {
          connection.query(
            'INSERT IGNORE INTO clients (client_id, full_name, email, phone) VALUES (?, ?, ?, ?)',
            [row.client_id, row.full_name, row.email, row.phone],
            (err) => {
              if (err) console.error('Error insertando fila CSV:', err);
            }
          );
        })
        .on('end', () => {
          console.log('CSV procesado correctamente');
        });
    } else {
      console.log('No se encontró data1.csv — salta carga inicial.');
    }
  });
});

// --- RUTAS CRUD ---

// Obtener todos los clientes
app.get('/clients', (req, res) => {
  connection.query('SELECT * FROM clients ORDER BY client_id', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error getting users' });
    res.json(results);
  });
});

// Obtener un cliente por ID
app.get('/clients/:client_id', (req, res) => {
  const { client_id } = req.params;
  connection.query('SELECT * FROM clients WHERE client_id = ?', [client_id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error getting user' });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(results[0]);
  });
});

// Crear cliente
app.post('/clients', (req, res) => {
  const { client_id, full_name, email, phone } = req.body;
  if (!client_id || !full_name || !email) {
    return res.status(400).json({ error: 'client_id, full_name and email are required' });
  }
  connection.query(
    'INSERT INTO clients (client_id, full_name, email, phone) VALUES (?, ?, ?, ?)',
    [client_id, full_name, email, phone || null],
    (err) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'El ID ya existe' });
        }
        return res.status(500).json({ error: 'Server failed' });
      }
      res.status(201).json({ message: 'Added user' });
    }
  );
});

// Actualizar cliente
app.put('/clients/:client_id', (req, res) => {
  const { client_id } = req.params;
  const { full_name, email, phone } = req.body;

  if (!full_name || !email) {
    return res.status(400).json({ error: 'full_name and email are required' });
  }

  connection.query(
    'UPDATE clients SET full_name = ?, email = ?, phone = ? WHERE client_id = ?',
    [full_name, email, phone || null, client_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Failed to update user' });
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User updated successfully' });
    }
  );
});

// Eliminar cliente
app.delete('/clients/:client_id', (req, res) => {
  const { client_id } = req.params;
  connection.query('DELETE FROM clients WHERE client_id = ?', [client_id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error deleting user' });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  });
});

app.listen(PORT, () => {
  console.log(`Running server on http://localhost:${PORT}`);
});
