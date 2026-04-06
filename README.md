# Apex CRM: Enterprise Command Center

Apex CRM is a sophisticated, cloud-native customer relationship management platform built on a modernized **Microservices Architecture**. It transforms standard CRM operations into a high-fidelity **Command Center** with real-time telemetry, strategic analytics, and an immersive glassmorphic interface.

 <!-- ![Enterprise Dashboard Showcase](Frontend/frontend-dashboard/src/assets/mockup.png)Note: Replace with actual hosted link after push if desired -->

## 🚀 Architectural Pillars

*   **Microservices Orchestration**: 6 specialized Spring Boot services communicating through a synchronized service mesh.
*   **Event-Driven Mesh**: Asynchronous communication via **Apache Kafka** for notification and ticket lifecycle events.
*   **Cloud Gateway & Discovery**: Edge routing through **Spring Cloud Gateway** and automated service discovery via **Eureka**.
*   **Relational & NoSQL Storage**: Multi-database strategy using **PostgreSQL** for transactional integrity and **MongoDB** for high-volume activity logging.

## 💻 Tech Stack

### Backend Logic (Java Ecosystem)
- **Framework**: Spring Boot 3.x / Spring Cloud / Spring Security (JWT)
- **Persistence**: Hibernate/JPA, PostgreSQL, MongoDB
- **Messaging**: Apache Kafka, Zookeeper
- **Service Mesh**: Netflix Eureka, Spring Cloud Gateway

### Frontend Presentation (React Ecosystem)
- **Framework**: React 18, Vite
- **Styling**: Tailwind CSS (Premium Glassmorphic Theme)
- **Visuals**: Lucide React Icons, Recharts (Strategic Telemetry)
- **State/API**: Axios, Centralized Request Interceptors

## 📂 Project Structure

```bash
Apex-CRM/
├── Backend/                 # Centralized Java Microservices
│   ├── api-gateway/         # Edge Router & Shared Security
│   ├── auth-service/        # JWT Authentication & RBAC
│   ├── customer-service/    # CRM Client Ecosystem Logic
│   ├── discovery-server/    # Eureka Registry Node
│   ├── notification-service/# MongoDB-backed Signal Logic
│   └── ticket-service/      # Main Ticketing & Operation Engine
├── Frontend/                # Presentation Layer
│   └── frontend-dashboard/  # React/Vite Premium Dashboard
├── devops/                  # CI/CD & Deployment Artifacts
├── docker-compose.yml       # Production/Local Orchestration
└── run-local.ps1            # Automated Windows Launch Script
```

## ✨ Core Features

*   **Strategic Telemetry**: Real-time KPI analytics for throughput, resolution rates, and network pressure.
*   **Mission Control (Task Manager)**: Advanced TO-DO management for operational agents.
*   **Signal Ops (Tickets)**: High-density ticket management with priority-weighted backlog tracking.
*   **Identity Portal**: Self-service profile management for both customers and support agents.
*   **Activity Grid**: Live-polling system feed for ecosystem monitoring.

## 🛠️ Local Deployment

### Prerequisites
- **Java 17+ (JDK)**
- **Node.js 18+ (LTS)**
- **Docker Desktop**

### Quick Start (One-Click)
Ensure Docker is running and execute the PowerShell orchestrator in the root:
```powershell
./run-local.ps1
```

### Manual Infrastructure
```bash
docker-compose up -d
```

## 🔒 Security & RBAC
The system implements strict **Role-Based Access Control**:
- **CUSTOMERS**: Limited to self-service ticket submission and personal profile portal.
- **SUPPORT AGENTS**: Full access to the Command Center, Analytics, and Customer Portfolios.
- **ADMINS**: Full ecosystem management and signal overrides.

---
*Built with precision for the next generation of Enterprise CRM management.*
