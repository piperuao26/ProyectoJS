# Infraestructura y DevOps

Este documento describe la configuración de infraestructura, decisiones técnicas y procesos DevOps utilizados en el proyecto.

## Docker

- El backend está dockerizado utilizando Node.js 20 Alpine
- Se expone el puerto 4000
- Se incluye un endpoint `/health` para validaciones de estado

## AWS

Servicios utilizados:

- Amazon ECR: almacenamiento de imágenes Docker
- Amazon ECS Fargate: ejecución de contenedores sin gestión de servidores
- IAM: manejo de permisos y usuarios para CLI
- CloudWatch Logs: logging de contenedores

## Seguridad

- No se utiliza la cuenta root para automatización
- Se creó un usuario IAM dedicado para CLI
- Se aplicó el principio de menor privilegio
- Las credenciales no se almacenan en el repositorio

## Integración Continua (CI)

Se implementó un pipeline de GitHub Actions que:

- Se ejecuta en cada push
- Instala dependencias del backend
- Valida la estructura del proyecto

El objetivo es detectar errores tempranos y garantizar estabilidad antes del despliegue.

