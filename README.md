# Advanced DevOps Project: Microservices with CI/CD & Monitoring

## 📌 Project Overview
This project simulates an industry-grade DevOps environment. It involves deploying a **Microservices Architecture** (Frontend & Backend) using **Docker**, orchestrated by **Docker Compose**, and deployed via an automated **Jenkins CI/CD Pipeline**.

To ensure reliability, the system includes:
- **Nginx Reverse Proxy** for load balancing/routing.
- **Prometheus & Grafana** for real-time monitoring.

## 🏗 Architecture Diagram
```mermaid
graph TD
    User((User)) -->|HTTP:80| Proxy[Nginx Reverse Proxy]
    Proxy -->|/| Frontend[Frontend Container (Nginx)]
    Proxy -->|/api| Backend[Backend API (Node.js)]
    Backend -->|Metrics| Prometheus[Prometheus]
    Prometheus --> Grafana[Grafana Dashboard]
    
    subgraph CI/CD Pipeline
    Repo[GitHub] --> Jenkins
    Jenkins --> Test[Run Tests]
    Jenkins --> Build[Build Images]
    Jenkins --> Push[Push to DockerHub]
    Jenkins --> Deploy[Docker Compose Up]
    end
```

## 🛠 Tech Stack
- **OS**: Linux (Ubuntu)
- **Containerization**: Docker & Docker Compose
- **Orchestration**: Docker Compose (Single Node)
- **CI/CD**: Jenkins (Pipeline as Code)
- **Monitoring**: Prometheus & Grafana
- **Networking**: Nginx Reverse Proxy
- **App Stack**: Node.js (Backend), HTML/JS (Frontend)

## 🚀 Deployment Guide
### 1. Prerequisites
- Docker & Docker Compose installed.
- Jenkins installed.

### 2. Manual Deployment (Testing Locally)
```bash
# Clone the repository
git clone https://github.com/your-username/advanced-devops-project.git
cd advanced-devops-project

# Start the stack
docker-compose up -d --build

# Access the application
# Dashboard: http://localhost:80
# Grafana:   http://localhost:30000 (Login: admin/admin)
# Prometheus: http://localhost:9090
```

### 3. Jenkins Setup (CI/CD)
1. Add DockerHub credentials in Jenkins (ID: `dockerhub-creds`).
2. Create a new Pipeline job.
3. Link it to your GitHub repository.
4. Run "Build Now".

## 📄 Resume Project Summary
**Project: Automated Microservices CI/CD Pipeline with Monitoring**
*Designed and deployed a scalable microservices application using Docker and Nginx. Implemented a fully automated CI/CD pipeline in Jenkins to build, test, and deploy containers to AWS EC2. Integrated Prometheus and Grafana for real-time system monitoring, reducing downtime risk by proactive alerting. Orchestrated services using Docker Compose for seamless inter-service communication.*

## 🗣 Common Interview Questions & Answers
**Q1: Why did you use Nginx as a Reverse Proxy?**
*A: To route traffic efficiently. It serves as a single entry point (Port 80), directing `/` to the frontend and `/api` to the backend, while also providing security headers and caching capabilities.*

**Q2: How does the monitoring stack work?**
*A: The Node.js backend exposes a `/metrics` endpoint using the `prom-client` library. Prometheus is configured to scrape this endpoint every 5 seconds. Grafana then queries Prometheus to visualize this data on a dashboard.*

**Q3: Explain your Jenkins Pipeline stages.**
*A: Checkout (Git) -> Test (NPM) -> Build (Docker Build) -> Push (Docker Hub) -> Deploy (Docker Compose). I also added a health check stage to `curl` the endpoints and verify uptime before marking the build as success.*

---
*Created for Advanced DevOps Portfolio*
