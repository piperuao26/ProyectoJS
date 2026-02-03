# Technical Test – Employee Management System

This project is part of a technical development test. The goal is to build a basic application for managing employees, credentials, and teams, following good development practices and basic DevOps concepts.

## Technologies Used

- **Frontend:** React.js
- **Backend:** Node.js with Express.js
- **Database:** SQLite3
- **Docker**
- **AWS (ECR and ECS Fargate)**
- **GitHub Actions (CI)**

## Project Structure

/ProyectoJS
 /backend
    /index.js # Project logic using Express and Crypto for random tokens
    /database.db # Project database
 /frontend
    /src
        /App.js # Employee and credentials management
        /Teams.js # Team and role management

## General Architecture

- The backend is dockerized
- The Docker image is stored in Amazon ECR
- The application is ready to run on ECS Fargate
- A health check endpoint is included for monitoring

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/piperuao26/ProyectoJS.git
cd ProyectoJS

cd backend
npm install
node index.js


## The backend runs at http://localhost:4000

cd ..
cd frontend
npm install
npm start
```
##  Endpoints principales

- ## GET/employees - List all employees
- ## POST/employees - Create employees with random credentials
- ## GET/credentials - List generated corporate credentials
- ## GET/Teams - List employees with assigned teams and roles
- ## POST/Teams - Assign a team and role to an employee


## User guide

- 1. Register an Employee
    - Go to the Employees tab
    - Fill in the form (first name, last name, city, birth date, personal email)
    - Click Register
    - Corporate email and password are generated automatically

- 2. View Credentials
    - Generated corporate email and password appear under the employee profile

- 3. Assign Team and Role
    - Go to the Teams tab
    - Select an existing employee
    - Choose a team (IT, Management, or HR)
    - Enter a role (example: Developer)
    - Click Assign
    - The system automatically shows the team leader and assigned team

## UX / UI

- Minimalist and functional design
- Clear navigation between Employees and Teams
- Tables are used to keep information readable and organized
- Simple forms with basic validation
- Designed for internal company use

## Project Status

- The project meets the main requirements of the technical test
- Some decisions, such as not exposing the service through a Load Balancer, were made to prioritize clarity, stability, and ease of delivery, while keeping the architecture ready for future improvements


## Future Improvements

- User authentication and authorization
- Stronger frontend validations
- Improved UI using Tailwind or Material UI
- Full deployment using ECS Service and Application Load Balancer
- Environment variable management from AWS
- Infrastructure as Code (Terraform)
- Automated CD pipeline


