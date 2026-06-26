# KubeMind AI

> **AI-Powered Kubernetes Monitoring Dashboard**

KubeMind AI is a full-stack Kubernetes monitoring platform that combines traditional cluster observability with AI-powered incident analysis. It enables users to monitor Kubernetes resources, inspect workloads, diagnose failures, and receive AI-generated root cause analysis and recommendations.

---
## Project Architecture

![Architecture](docs/images/architecture.png)

## Features

### Kubernetes Cluster Monitoring

* Dashboard with cluster overview
* Pod monitoring
* Deployment monitoring
* Service monitoring
* Cluster health summary
* Incident history

### Pod Diagnostics

* Pod details
* Container information
* Events
* Logs
* Related Kubernetes resources
* Restart count
* Status monitoring

### AI Incident Analysis

* Automatic incident detection
* AI-generated incident summary
* Root cause analysis
* Severity assessment
* Actionable recommendations
* Context-aware Kubernetes troubleshooting

### Backend

* FastAPI REST APIs
* Kubernetes Python Client
* Ollama LLM Integration
* Incident Detection Engine
* Context Builder
* Prompt Builder
* Resource Mapper

### Frontend

* React + TypeScript
* Vite
* Tailwind CSS
* Responsive dashboard
* Search and filtering
* Modern UI

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Axios
* React Router

### Backend

* FastAPI
* Python
* Kubernetes Python Client
* Ollama
* HTTPX
* Pydantic

### Infrastructure

* Kubernetes (Kind)
* Docker
* Ollama LLM

---

## Project Architecture

```text
                    KubeMind AI

        +-------------------------------+
        |       React + Vite Frontend   |
        +---------------+---------------+
                        |
                  REST API
                        |
        +---------------v---------------+
        |        FastAPI Backend         |
        +---------------+---------------+
                        |
        +---------------+---------------+
        |                               |
 Kubernetes Python Client          Ollama LLM
        |                               |
 Kubernetes Cluster          AI Incident Analysis
```

---

## AI Analysis Flow

```text
Pod Failure
      │
      ▼
Incident Detection
      │
      ▼
Collect Context
      │
      ▼
Prompt Builder
      │
      ▼
Ollama
      │
      ▼
Summary
Root Cause
Recommendation
Severity
```

---

## Project Structure

```text
kubemind-ai/

├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── services/
│   │   ├── schemas/
│   │   ├── kubernetes/
│   │   └── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── types/
│   │   └── layouts/
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone git@github.com:agkavinraj/kubemind-ai.git
cd kubemind-ai
```

---

### Backend

```bash
cd backend

python -m venv .venv

source .venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs on:

```
http://localhost:8000
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

### Ollama

Install Ollama and pull your preferred model.

Example:

```bash
ollama pull llama3
```

Start Ollama before launching the backend.

---

## API Endpoints

| Method | Endpoint                         | Description           |
| ------ | -------------------------------- | --------------------- |
| GET    | `/dashboard`                     | Cluster summary       |
| GET    | `/pods`                          | List all pods         |
| GET    | `/pod-details/{namespace}/{pod}` | Pod diagnostics       |
| GET    | `/deployments`                   | Deployments           |
| GET    | `/services`                      | Services              |
| GET    | `/nodes`                         | Cluster nodes         |
| GET    | `/namespaces`                    | Namespaces            |
| GET    | `/events`                        | Cluster events        |
| GET    | `/incident-history`              | AI analyzed incidents |
| GET    | `/analyze/{namespace}/{pod}`     | Analyze pod with AI   |

---


### Dashboard

```
docs/images/dashboard.png
```

### Pods

```
docs/images/pods.png
```

### Pod Details

```
docs/images/podDetails.png
```

### Services

```
docs/images/services.png
```

### Deployments

```
docs/images/deployments.png
```

---

## Future Enhancements

* AI Copilot
* Real-time WebSocket updates
* Prometheus integration
* Grafana dashboards
* Authentication (JWT)
* RBAC
* Dark mode
* Helm Chart
* Docker Compose
* Kubernetes deployment manifests
* PDF incident reports

---

## Learning Outcomes

This project demonstrates practical experience with:

* Kubernetes
* FastAPI
* React
* TypeScript
* Python
* REST API Development
* Kubernetes Python Client
* AI Integration using Ollama
* Prompt Engineering
* DevOps Tooling
* Cluster Monitoring

---

## Author

**Kavin Raj**

GitHub: https://github.com/agkavinraj

LinkedIn: *(Add your LinkedIn profile here)*

---

## License

This project is licensed under the MIT License.
