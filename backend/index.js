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
app.get("/", (req, res) => {
  res.json({ message: "Backend funcionando 🚀" });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
