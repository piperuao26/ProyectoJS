import { useEffect, useState } from "react";

function App() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    city: "",
    birthDate: "",
    email: ""
  });

  const [employees, setEmployees] = useState([]);

  // Manejar cambios en inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Enviar formulario al backend
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Empleado registrado ✅");
        setForm({ firstName: "", lastName: "", city: "", birthDate: "", email: "" });
        loadEmployees();
      });
  };

  // Cargar empleados existentes
  const loadEmployees = () => {
    fetch("http://localhost:4000/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "auto", fontFamily: "Arial" }}>
      <h1>🚀 Registro de Empleados</h1>
      
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input name="firstName" placeholder="Nombre" value={form.firstName} onChange={handleChange} required />
        <input name="lastName" placeholder="Apellido" value={form.lastName} onChange={handleChange} required />
        <input name="city" placeholder="Ciudad" value={form.city} onChange={handleChange} required />
        <input name="birthDate" type="date" placeholder="Fecha Nacimiento" value={form.birthDate} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Correo" value={form.email} onChange={handleChange} required />
        <button type="submit" style={{ padding: "10px", cursor: "pointer" }}>Registrar</button>
      </form>

      <h2 style={{ marginTop: "30px" }}>📋 Lista de Empleados</h2>
      <table border="1" width="100%" style={{ marginTop: "10px", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Ciudad</th>
            <th>Nacimiento</th>
            <th>Email</th>
            <th>Registro</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.firstName}</td>
              <td>{emp.lastName}</td>
              <td>{emp.city}</td>
              <td>{emp.birthDate}</td>
              <td>{emp.email}</td>
              <td>{emp.registrationDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
