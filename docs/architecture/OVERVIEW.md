# SKILLORA — Architecture Overview

## Product Positioning

SKILLORA is an **AI-powered Entrepreneurship & Enterprise Management** platform.

Tagline: *Build smarter. Manage better. Grow with AI.*

Core promise: AI becomes an intelligent **business operating layer**, not a generic chatbot.

## Reference Architecture Selection

Strongest retained concepts from the supplied architecture image:

- **Enterprise Management** (central pillar)
- **Employability Automation** (supporting workforce module)
- **Core Development Flow**
- **Technical Stack Foundations**
- **AI and Machine Learning Integration**
- **Unified Integration Hub**
- **Cloud Infrastructure and Deployment**
- **Security Protocols**

Deliberately de-emphasized as independent product drivers:

- Blockchain (optional future boundary only)
- Full ERP
- Pure financial optimization products
- Standalone HR automation products

## Layered Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Clients: Web (Next.js) · Mobile · Admin Console            │
├─────────────────────────────────────────────────────────────┤
│  Application Shell · Auth · Org/Workspace · RBAC            │
├─────────────────────────────────────────────────────────────┤
│  Domain Modules                                             │
│  Entrepreneur · Strategy · Finance · Operations · HR        │
│  Compliance · Market · Documents · Reports · Workflows      │
├─────────────────────────────────────────────────────────────┤
│  AI Layer                                                   │
│  Copilot · Intent Router · Tool Layer · Context Engine      │
│  Explainability · RAG · Safety / Hallucination Control      │
├─────────────────────────────────────────────────────────────┤
│  Unified Integration Hub                                    │
│  API Gateway · Events · Notifications · External Adapters   │
├─────────────────────────────────────────────────────────────┤
│  Data & Services                                            │
│  PostgreSQL · Object Storage · Vector Search (optional)     │
│  Background Jobs · Ingestion · Analytics                    │
├─────────────────────────────────────────────────────────────┤
│  Foundations                                                │
│  Security · Audit · Observability · Cloud · CI/CD           │
└─────────────────────────────────────────────────────────────┘
```

## Core Entrepreneur Journey

```
IDEA → VALIDATE → PLAN → BUILD → OPERATE → MEASURE → OPTIMIZE → SCALE
```

Every major feature maps to at least one stage of this lifecycle.

## Flagship Workflow

```
Founder Onboarding
      ↓
Business Profile
      ↓
AI Business Analysis
      ↓
Business Health + KPIs
      ↓
Identify Risks / Opportunities
      ↓
AI Strategy + Scenario Planning
      ↓
Finance + Operations + HR
      ↓
Workflow Automation
      ↓
Reporting + Decision Support
      ↓
Growth Planning
      ↓
Scale the Business
```

## Non-negotiable Rules

1. Never invent customers, revenue, certifications, accuracy % or legal requirements.
2. All important AI recommendations are explainable and data-grounded.
3. Permissions enforced on the backend.
4. Critical workflows continue when AI services fail.
5. Sensitive data is permission-aware.
6. Frontend never contains secrets.
7. Demo data is always clearly labelled.

## Tech Stack

| Concern        | Choice                          |
|----------------|---------------------------------|
| Frontend       | Next.js 14 + TypeScript + Tailwind |
| Backend        | FastAPI (Python)                |
| Database       | PostgreSQL                      |
| Auth           | JWT + RBAC                      |
| AI             | Provider-agnostic LLM + tools   |
| Infra          | Docker Compose → Cloud ready    |

## Status

Foundational layers (01–14, 64–66, 108–111) are scaffolded.
Subsequent layers (AI tools, finance, HR, compliance, workflows, etc.) plug into this core.
