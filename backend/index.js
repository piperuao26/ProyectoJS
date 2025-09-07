const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(cors());
app.use(express.json());

// Conectar base de datos SQLite
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) console.error("Error al conectar DB:", err.message);
  else console.log("Conectado a SQLite.");
});

// Endpoint de prueba
// Registrar empleado
app.post("/employees", (req, res) => {
  const { firstName, lastName, city, birthDate, email } = req.body;
  const registrationDate = new Date().toISOString().split("T")[0]; // fecha YYYY-MM-DD

  db.run(
    `INSERT INTO employees (firstName, lastName, city, birthDate, email, registrationDate)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [firstName, lastName, city, birthDate, email, registrationDate],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, firstName, lastName, email });
    }
  );
});

// Listar empleados
app.get("/employees", (req, res) => {
  db.all(`SELECT * FROM employees`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));

// Crear tabla usuarios si no existe
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT,
      lastName TEXT,
      city TEXT,
      birthDate TEXT,
      email TEXT,
      registrationDate TEXT
    )
  `);
});
