import React, { useState, useEffect } from "react";
import Teams from "./Teams";

function App() {
  const [page, setPage] = useState("employees");
  const [employees, setEmployees] = useState([]);
  const [credentials, setCredentials] = useState([]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    city: "",
    birthDate: "",
    email: "",
  });

  // Cargar empleados
  const loadEmployees = () => {
    fetch("http://localhost:4000/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  };

  // Cargar credenciales
  const loadCredentials = () => {
    fetch("http://localhost:4000/credentials")
      .then((res) => res.json())
      .then((data) => setCredentials(data));
  };

  useEffect(() => {
    loadEmployees();
    loadCredentials();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => {
        setForm({
          firstName: "",
          lastName: "",
          city: "",
          birthDate: "",
          email: "",
        });
        loadEmployees();
        loadCredentials();
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Barra de navegación */}
      <nav style={{ marginBottom: "20px" }}>
        <button onClick={() => setPage("employees")}>👤 Empleados</button>
        <button onClick={() => setPage("teams")} style={{ marginLeft: "10px" }}>
          👥 Equipos
        </button>
      </nav>

      {/* Página de empleados */}
      {page === "employees" && (
        <>
          <h2>👤 Registro de Empleados</h2>
          <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Nombre"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Apellido"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Ciudad"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              required
            />
            <input
              type="date"
              placeholder="Fecha de nacimiento"
              value={form.birthDate}
              onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email personal"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <button type="submit">Registrar</button>
          </form>

          <h3>📋 Lista de Empleados</h3>
          <table
            border="1"
            width="100%"
            style={{ borderCollapse: "collapse", marginBottom: "20px" }}
          >
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Ciudad</th>
                <th>Fecha de nacimiento</th>
                <th>Email personal</th>
                <th>Fecha registro</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((e) => (
                <tr key={e.id}>
                  <td>{e.firstName}</td>
                  <td>{e.lastName}</td>
                  <td>{e.city}</td>
                  <td>{e.birthDate}</td>
                  <td>{e.email}</td>
                  <td>{e.registrationDate}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>🔑 Credenciales Generadas</h3>
          <table border="1" width="100%" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email corporativo</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              {credentials.map((c, i) => (
                <tr key={i}>
                  <td>{c.firstName}</td>
                  <td>{c.lastName}</td>
                  <td>{c.email}</td>
                  <td>{c.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Página de equipos */}
      {page === "teams" && <Teams />}
    </div>
  );
}

export default App;
