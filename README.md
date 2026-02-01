## Devops 

Este proyecto es una aplicacion *FUll Stack* para la gestion de empleados, credenciales y equipos/roles dentro de una organización 

## Tecnologias usadas
- ## **Frontend:** React.js
- ## **Backend:** Node.js con Express.js
- ## **Base de datos:** SQLite3

## Estructura del proyecto:
/ProyectoJS
 /backend
    /index.js # Manejo de la funcionalidad del proyecto usando Crypto para las tokens aleatorias y express.js
    /database.db # Base de datos del proyecto
 /frontend
    /src
        /App.js # Gestion de empleados y credenciales
        /Teams.js # Gestion de equipos y roles

## Instalacion y configuracion

## 1. Clonar el repositorio
```bash
git clone https://github.com/piperuao26/ProyectoJS.git

cd ProjectoJS

cd backend
npm install
npm index.js

## El backend corre en http://localhost:4000

cd ..
cd frontend
npm install
npm start
```
##  Endpoints principales

- ## GET/employees - Lista todos sus empleados
- ## POST/employees - Crea sus empleados y sus credenciales aleatorias
- ## GET/credentials - Lista credenciales corporativas generadas
- ## GET/Teams - Lista empleados con equipos y roles
- ## POST/Teams - Asigna un rol y equipo a un empleado


## Manual de usuario 

- 1. Registrar empleado
    - Ir a la pestaña *Empleados*
    - Completar el formulario (nombre, apellido, ciudad, fecha de nacimiento, email personal)
    - Presionar Registrar
    - Automaticamente genera su correo corporativo y contraseña en la seleccion de credenciales

- 2. Ver credenciales
    - En la seccion de credenciales generadas abajo del perfil creado del empleado apareceran el email corporativo y la contraseña automaticamente generada

- 3. Asignar equipo y rol
    - Cambiar a la pestaña *Equipos*
    - Seleccionar empleado existente 
    - Escoger el equipo (TI, Gerencia o RRHH)
    - Escribir el rol (ejempo: Desarrollador)
    - Presionar asignar
    - El sistema mostrara automaticamente el lider del equipo y el equipo al cual acaba de ser registrado el empleado

## UX / UI

- El diseño es *minimalista y funcional*, con navegacion clara y simple entre *empleados* y *equipo*
- Uso de tablas para mantener la informacion legible y actualizada 
- Formularios simples con validacion minima
- Experiencia pensada para el uso interno de la empresa 

## Mejoras futuras

- Autenticacion y permisos por usuario
- Validaciones mas robustas en el frontend
- Estilos con Tailwind o Material UI para una mejor UI

