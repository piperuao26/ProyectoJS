import React, { useState, useEffect } from "react";

function App() {
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
      .then((data) => setEmployees(data))
      .catch((err) => console.error("Error loadEmployees:", err));
  };

  // Cargar credenciales
  const loadCredentials = () => {
    fetch("http://localhost:4000/credentials")
      .then((res) => res.json())
      .then((data) => setCredentials(data))
      .catch((err) => console.error("Error loadCredentials:", err));
  };

  useEffect(() => {
    loadEmployees();
    loadCredentials();
  }, []);

  // Manejar input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.credentials) {
          alert(`✅ Credenciales generadas:\nEmail: ${data.credentials.corpEmail}\nPassword: ${data.credentials.password}`);
        }
        setForm({ firstName: "", lastName: "", city: "", birthDate: "", email: "" });
        loadEmployees();
        loadCredentials();
      })
      .catch((err) => console.error("Error handleSubmit:", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gestión de Empleados 🚀</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input name="firstName" placeholder="Nombre" value={form.firstName} onChange={handleChange} required />
        <input name="lastName" placeholder="Apellido" value={form.lastName} onChange={handleChange} required />
        <input name="city" placeholder="Ciudad" value={form.city} onChange={handleChange} required />
        <input type="date" name="birthDate" value={form.birthDate} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email personal" value={form.email} onChange={handleChange} required />
        <button type="submit">Registrar</button>
      </form>

      <h2>📋 Lista de empleados</h2>
      <table border="1" width="100%" style={{ borderCollapse: "collapse", marginBottom: "30px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Ciudad</th>
            <th>Nacimiento</th>
            <th>Email personal</th>
            <th>Registro</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e.id}>
              <td>{e.id}</td>
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

      <h2>🔑 Credenciales Generadas</h2>
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
    </div>
  );
}

export default App;
