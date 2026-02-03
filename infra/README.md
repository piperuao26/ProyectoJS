# Infrastructure and DevOps

This document describes the infrastructure setup, technical decisions, and DevOps processes used in the project.

## Docker

- The backend is containerized using Node.js 20 Alpine
- Port 4000 is exposed
- A `/health` endpoint is included for health checks

## AWS

Services used:

- Amazon ECR: stores Docker images
- Amazon ECS Fargate: runs containers without server management
- IAM: manages permissions and CLI access
- CloudWatch Logs: container logging

## Security

- The root account is not used for automation
- A dedicated IAM user was created for CLI access
- The principle of least privilege was applied
- Credentials are not stored in the repository

## Continuous Integration (CI)

A GitHub Actions pipeline was implemented that:

- Runs on every push
- Installs backend dependencies
- Validates the project structure

The goal is to detect errors early and ensure stability before deployment.
