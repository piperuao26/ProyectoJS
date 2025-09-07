import React, { useState, useEffect } from "react";

function Teams() {
  const [employees, setEmployees] = useState([]);
  const [teams, setTeams] = useState([]);

  const [form, setForm] = useState({
    employeeId: "",
    team: "TI",
    role: "",
  });

  // Cargar empleados para seleccionar
  useEffect(() => {
    fetch("http://localhost:4000/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data));

    loadTeams();
  }, []);

  const loadTeams = () => {
    fetch("http://localhost:4000/teams")
      .then((res) => res.json())
      .then((data) => setTeams(data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => {
        setForm({ employeeId: "", team: "TI", role: "" });
        loadTeams();
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>👥 Asignación de Equipos y Roles</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <label>Empleado: </label>
        <select
          value={form.employeeId}
          onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
          required
        >
          <option value="">Seleccione un empleado</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.firstName} {emp.lastName}
            </option>
          ))}
        </select>

        <label style={{ marginLeft: "10px" }}>Equipo: </label>
        <select
          value={form.team}
          onChange={(e) => setForm({ ...form, team: e.target.value })}
        >
          <option value="TI">TI</option>
          <option value="Gerencia">Gerencia</option>
          <option value="RRHH">RRHH</option>
        </select>

        <label style={{ marginLeft: "10px" }}>Rol: </label>
        <input
          type="text"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          placeholder="Ej: Desarrollador"
          required
        />

        <button type="submit" style={{ marginLeft: "10px" }}>
          Asignar
        </button>
      </form>

      <h3> Lista de Equipos y Roles</h3>
      <table border="1" width="100%" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Equipo</th>
            <th>Rol</th>
            <th>Líder</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((t, i) => (
            <tr key={i}>
              <td>{t.firstName}</td>
              <td>{t.lastName}</td>
              <td>{t.team}</td>
              <td>{t.role}</td>
              <td>{t.leader}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teams;
