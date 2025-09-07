const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const crypto = require("crypto");

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) console.error("❌ Error al conectar DB:", err.message);
  else console.log("✅ Conectado a SQLite.");
});

// Tablas
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

  db.run(`
    CREATE TABLE IF NOT EXISTS credentials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      employeeId INTEGER,
      email TEXT,
      password TEXT,
      FOREIGN KEY (employeeId) REFERENCES employees(id)
    )
  `);
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS teams (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      employeeId INTEGER,
      team TEXT,
      role TEXT,
      leader TEXT,
      FOREIGN KEY (employeeId) REFERENCES employees(id)
    )
  `);
});


// Generar password aleatoria localmente
function generatePassword(length = 16) {
  return crypto.randomBytes(Math.ceil(length / 2)).toString("hex").slice(0, length);
}

// Test
app.get("/", (req, res) => {
  res.json({ message: "Backend funcionando 🚀" });
});

// Obtener empleados
app.get("/employees", (req, res) => {
  db.all("SELECT * FROM employees", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Registrar empleado + credenciales
app.post("/employees", (req, res) => {
  const { firstName, lastName, city, birthDate, email } = req.body;
  const registrationDate = new Date().toISOString().split("T")[0];

  app.post("/teams", (req, res) => {
  const { employeeId, team, role } = req.body;

  // Asignar líder fijo según equipo
  let leader = "N/A";
  if (team === "TI") leader = "LiderTI";
  else if (team === "Gerencia") leader = "LiderGerencia";
  else if (team === "RRHH") leader = "LiderRRHH";

  db.run(
    `INSERT INTO teams (employeeId, team, role, leader) VALUES (?, ?, ?, ?)`,
    [employeeId, team, role, leader],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ teamId: this.lastID, employeeId, team, role, leader });
    }
  );
});

app.get("/teams", (req, res) => {
  db.all(
    `SELECT employees.firstName, employees.lastName, teams.team, teams.role, teams.leader
     FROM teams
     JOIN employees ON employees.id = teams.employeeId`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});


  db.run(
    `INSERT INTO employees (firstName, lastName, city, birthDate, email, registrationDate)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [firstName, lastName, city, birthDate, email, registrationDate],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      const employeeId = this.lastID;
      const corpEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@kiwibot.com`.replace(/\s+/g, "");
      const password = generatePassword(16);

      db.run(
        `INSERT INTO credentials (employeeId, email, password) VALUES (?, ?, ?)`,
        [employeeId, corpEmail, password],
        function (err2) {
          if (err2) return res.status(500).json({ error: err2.message });

          res.json({
            employee: { id: employeeId, firstName, lastName, city, birthDate, email, registrationDate },
            credentials: { corpEmail, password },
          });
        }
      );
    }
  );
});

// Consultar credenciales
app.get("/credentials", (req, res) => {
  db.all(
    `SELECT e.firstName, e.lastName, c.email, c.password
     FROM credentials c
     JOIN employees e ON e.id = c.employeeId`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

const PORT = 4000;
app.listen(PORT, () => console.log(`✅ Servidor en http://localhost:${PORT}`));
