# ROLE

Act as a **Principal Software Architect, Senior Backend/Frontend Engineer, and Codebase Investigator**.

You have access to the complete repository, including:

* Back-End
* Front-End
* Router
* Payload Request/Response

Your task is to deeply analyze the existing implementation and create **ONE durable Markdown knowledge base**:

`LLM_SYSTEM_CONTEXT.md`

This document will be used as the primary architectural/context reference by future coding LLMs such as **Qwen 3.7 Plus and DeepSeek**.

The goal is NOT to replace the source code.

The goal is to create a highly accurate **map of the codebase, contracts, dependencies, business logic, and end-to-end execution flows**, so future LLMs can quickly determine:

* Where a feature is implemented.
* Which frontend component triggers it.
* Which API it calls.
* Which request payload it sends.
* Which Router handles it.
* Which Controller/Handler is executed.
* Which Service is called.
* Which Repository/Data Access layer is called.
* Which SQL query / ORM operation / database operation occurs.
* How the database result is transformed.
* Which Response DTO/Payload is returned.
* How the response reaches the frontend.
* Which frontend state/component consumes the response.
* What could break if a specific file or contract is changed.

---

# ABSOLUTE RULES

## 1. SOURCE CODE IS THE SOURCE OF TRUTH

The actual repository implementation is the primary source of truth.

Do not invent behavior.

If README files, comments, documentation, naming, or architectural assumptions contradict the implementation, trust the implementation and explicitly document the discrepancy.

---

## 2. NEVER HALLUCINATE

Classify important information as:

* **FACT** — directly confirmed by source code.
* **INFERENCE** — strongly supported by multiple pieces of evidence.
* **UNKNOWN** — cannot be determined from the repository.

If something cannot be determined, explicitly write:

`NOT FOUND / NOT DETERMINABLE FROM REPOSITORY`

Never fill missing information with assumptions.

---

## 3. SOURCE EVIDENCE

For important technical claims, provide concrete evidence whenever practical:

`File Path → Class/Struct/Interface → Function/Method`

Example:

`Back-End/Services/PaymentService.cs → PaymentService.ProcessPayment()`

For database operations, identify the actual query/function/method where possible.

For frontend behavior, identify the actual component/hook/store/API client.

---

## 4. PRIORITIZE USEFUL KNOWLEDGE

Do NOT spend equal effort documenting every file.

Prioritize:

### CRITICAL

* Application entry points
* Router registration
* API endpoints
* Controllers/Handlers
* Business Services
* Repository/Data Access
* SQL queries
* Request/Response DTOs
* Authentication/Authorization
* Frontend API integration
* State management
* Critical business flows
* External integrations

### IMPORTANT

* Shared utilities
* Middleware
* Validation
* Error handling
* Configuration
* Models/Entities
* Common components/hooks

### LOW PRIORITY

* Boilerplate
* Generated files
* Static assets
* Build artifacts
* Vendor libraries
* Repetitive trivial code

Do not waste documentation space on low-value boilerplate unless it affects system behavior.

---

# 1. PROJECT OVERVIEW

Provide a concise but technically accurate overview of:

* What the system does.
* Major business domains/modules.
* Frontend architecture.
* Backend architecture.
* Router architecture.
* Payload architecture.
* Database.
* External systems.
* Major technology stack.

Include a high-level Mermaid architecture diagram.

Also provide:

| Component | Entry Point | File | Responsibility |
| --------- | ----------- | ---- | -------------- |

---

# 2. TECHNOLOGY STACK & CONVENTIONS

## 2.1 Technology Stack

Identify technologies actually confirmed by the repository:

* Frontend framework
* Backend framework/runtime
* Programming languages
* Router library/framework
* Request/Response Payload system
* DTO / Struct / Schema / Validator
* Database
* ORM / Query Layer
* UI Library
* State Management
* API Client
* Authentication
* Logging
* Testing
* Build tooling
* External integrations

Do not list technologies merely because they are common for the framework.

---

## 2.2 Coding Conventions

Document observed conventions:

* File naming
* Folder naming
* Class naming
* Interface naming
* Function naming
* Variable naming
* DTO naming
* Request/Response naming
* FE component naming
* Hook/store naming
* API naming
* Database naming
* Error handling conventions
* Dependency injection conventions

If conventions are inconsistent, document the inconsistency.

---

## 2.3 Configuration & Environment

Document important configuration and environment variables.

Use:

| Config / Variable | Component | Purpose | Required | Evidence |
| ----------------- | --------- | ------- | -------- | -------- |

NEVER expose:

* API keys
* Passwords
* Tokens
* Secrets
* Credentials

Only document variable/configuration names and their purpose.

---

# 3. SYSTEM ARCHITECTURE & DIRECTORY MAP

## 3.1 High-Level Architecture

Explain the actual relationship between:

`Frontend → Router → Backend → Database / External Services`

and:

`Database / External Services → Backend → Router → Frontend`

Explain the responsibility and boundary of each layer.

Include Mermaid where useful.

---

## 3.2 Directory Map

Create concise directory maps for:

* Front-End
* Back-End
* Router
* Payload Request/Response

Only include important directories and files.

Skip:

* node_modules
* vendor
* bin
* obj
* dist
* build
* coverage
* generated artifacts
* irrelevant static assets

For each major module, explain:

* Responsibility
* Important files
* Dependencies
* Consumers

---

## 3.3 Module Dependency Map

Identify:

* Shared modules
* Cross-layer dependencies
* Highly coupled areas
* Circular dependencies
* Unexpected dependencies
* Important dependency chains

---

# 4. DATABASE SCHEMA & DATA MODELS

## 4.1 Database Schema

Document tables/collections only when supported by repository evidence such as:

* SQL scripts
* Migrations
* ORM entities
* Models
* Schema definitions
* Repository queries

Use:

| Table / Collection | Field | Type | Nullable | PK | FK | Default | Index | Evidence |
| ------------------ | ----- | ---- | -------- | -- | -- | ------- | ----- | -------- |

---

## 4.2 Relationships

Document:

* 1:1
* 1:N
* N:M
* Foreign keys
* Constraints
* Cascade behavior

Mark inferred relationships as `INFERENCE`.

---

## 4.3 Data Model Transformation

Trace important data through:

`Frontend Model → Request DTO → Backend Model → Database Model → Response DTO → Frontend Model`

Document:

* Field renaming
* Type conversion
* Serialization/deserialization
* Default values
* Nullable differences
* Calculated fields
* Mapping/transformation logic

---

# 5. ROUTER & API CONTRACT — CRITICAL

This is one of the highest-priority sections.

## 5.1 Router Architecture

Document:

* Router initialization
* Route registration
* Route groups
* Middleware
* Authentication
* Authorization
* Validation
* Error handling

Identify exact files and symbols.

---

## 5.2 COMPLETE API ENDPOINT INVENTORY

Document all meaningful application endpoints.

Use:

| Method | Endpoint | Router File | Handler/Controller | Middleware/Auth | Request DTO | Response DTO |
| ------ | -------- | ----------- | ------------------ | --------------- | ----------- | ------------ |

Do not omit application endpoints.

Framework-generated or irrelevant infrastructure endpoints may be excluded.

---

## 5.3 REQUEST PAYLOAD CONTRACT

For every important request payload/DTO:

| Payload | Field | Type | Required | Validation | Default | Used By |
| ------- | ----- | ---- | -------- | ---------- | ------- | ------- |

Document:

* Nested structures
* Arrays
* Enums
* Allowed values
* Validation rules
* Transformations
* Nullable/optional fields

---

## 5.4 RESPONSE PAYLOAD CONTRACT

Document:

* Success wrapper
* Error wrapper
* HTTP status codes
* Error codes
* Data structure
* Pagination
* Metadata
* Nullable fields
* Nested structures

If multiple endpoints share an identical response structure, document it once and reference it rather than duplicating it.

---

## 5.5 CANONICAL API LOOKUP TABLE

Create:

| Method | Endpoint | Handler | Request DTO | Response DTO | Auth/Middleware | Frontend Consumers |
| ------ | -------- | ------- | ----------- | ------------ | --------------- | ------------------ |

This table must be accurate enough for another LLM to quickly locate the implementation.

---

# 6. FRONTEND ARCHITECTURE

## 6.1 Frontend Routing

| URL / Route | Page/Screen | Component | Authentication | Important Dependencies |
| ----------- | ----------- | --------- | -------------- | ---------------------- |

---

## 6.2 State Management

Identify:

* Global state
* Local state
* Context
* Stores
* Query cache
* Server state
* Authentication state
* Derived state

Explain important state flows.

---

## 6.3 Frontend API Integration

For every important feature, map:

`Page/Component → Hook/Store/Service → API Client → Endpoint → Request Payload`

Provide exact file paths and symbols.

---

## 6.4 Important Frontend Patterns

Document recurring patterns for:

* API calls
* Forms
* Validation
* Error handling
* Loading states
* Pagination
* Caching
* Authentication
* State updates

---

# 7. END-TO-END CALL CHAIN & DATA FLOW — MOST CRITICAL

This section is extremely important.

For every major business-critical API flow, reconstruct the **actual execution chain**, not just a high-level description.

Trace as deeply as the repository allows:

`Frontend Page/Component`
→ `Frontend Handler / Hook / Store`
→ `Frontend API Client`
→ `HTTP Method + Endpoint`
→ `Query Parameters / Path Parameters / Request Payload`
→ `Router`
→ `Middleware`
→ `Handler / Controller`
→ `Service`
→ `Repository / Data Access`
→ `Actual SQL Query / ORM Operation`
→ `Database / External Service`
→ `Database Result`
→ `Repository Mapping`
→ `Service Mapping`
→ `Response DTO / Payload`
→ `HTTP Response`
→ `Frontend API Client`
→ `Frontend State / Hook`
→ `Frontend Component`

Do NOT stop at "the controller calls a service".

Continue tracing until the actual database query, ORM operation, stored procedure, or external service call is identified.

---

## 7.1 Required Flow Format

For each major flow:

### Flow: [Feature / Operation]

#### A. Frontend Trigger

* Page/Screen
* Component
* File
* Function/Handler
* User action / trigger

#### B. Frontend State & Logic

* Hook
* Store
* Context
* File
* Function
* State involved
* Data transformation

#### C. API Request

* API Client
* File
* Function
* HTTP Method
* Endpoint
* Path Parameters
* Query Parameters
* Headers
* Request Payload
* Request DTO/Type

Document actual field names and types.

#### D. Router

* Router File
* Route Definition
* Middleware
* Authentication
* Authorization
* Validation
* Handler/Controller

#### E. Handler / Controller

* File
* Class/Struct
* Function
* Input
* Output
* Service called

#### F. Service Call Chain

Trace every meaningful function call.

Example:

`Controller.GetPayment()`
→ `PaymentService.GetPayment()`
→ `PaymentRepository.GetPayment()`

For every meaningful step provide:

* File
* Symbol
* Input
* Output
* Transformation
* Side effects

#### G. Database / External Service

Identify the actual operation.

For SQL:

* File
* Function/method
* SQL query or concise normalized representation
* Tables
* JOINs
* WHERE conditions
* Parameters
* Stored procedures
* Transaction behavior

For ORM:

* Entity/model
* Query method
* Filters
* Includes/joins
* Ordering
* Pagination

For external APIs:

* HTTP method
* Endpoint
* Request
* Response
* Authentication
* Client implementation

#### H. Response Data Flow

Trace:

`Database Result`
→ `Repository Model`
→ `Service Model`
→ `Response DTO`
→ `Router Response`
→ `Frontend API Client`
→ `Frontend Model`
→ `Store/Hook/State`
→ `Frontend Component`

Document:

* Field mapping
* Renaming
* Type conversion
* Nullable fields
* Default values
* Serialization
* Filtering
* Sorting
* Pagination
* Calculations

#### I. Response Contract

Document:

* HTTP status
* Response wrapper
* Response DTO
* Fields
* Types
* Nullable/optional fields
* Error responses

#### J. Failure Paths

Trace what happens when:

* Validation fails
* Authentication fails
* Authorization fails
* Service fails
* Database query fails
* External API fails
* Unexpected exception occurs

Explain how the failure eventually reaches the frontend.

---

## 7.2 CALL CHAIN LOOKUP TABLE

Create:

| Feature | FE Entry | Hook/Store | API Client | Method | Endpoint | Router | Handler | Service | Repository/Query | Response DTO | FE Consumer |
| ------- | -------- | ---------- | ---------- | ------ | -------- | ------ | ------- | ------- | ---------------- | ------------ | ----------- |

This table should allow a future LLM to answer:

> "If I modify this frontend screen, which backend service and database query are affected?"

---

## 7.3 TRACE CONFIDENCE

For every call-chain step classify:

* `CONFIRMED`
* `INFERRED`
* `UNKNOWN`

Never silently skip an ambiguous link.

---

# 8. BUSINESS LOGIC & CRITICAL FLOWS

Identify the most important business workflows actually implemented.

Prioritize:

1. Authentication
2. Core business transactions
3. Complex CRUD
4. Data synchronization
5. External integrations
6. Batch processing
7. Other complex workflows

For each flow explain:

1. Trigger
2. FE component
3. FE state/action
4. API request
5. Router
6. Validation
7. Handler/Controller
8. Service/business logic
9. Repository/DB/external service
10. Response
11. FE response handling
12. State update

Include Mermaid diagrams for complex flows.

---

# 9. BUSINESS RULES & INVARIANTS

Identify rules that future LLMs must preserve.

Examples:

* Required state transitions
* Validation rules
* Permission requirements
* Transaction boundaries
* Ordering requirements
* Data consistency rules
* Required fields
* API contract requirements
* Middleware requirements
* Side effects

Use:

| Rule | Evidence | Impact if Broken | Confidence |
| ---- | -------- | ---------------- | ---------- |

---

# 10. AUTHENTICATION & AUTHORIZATION

Trace authentication and authorization end-to-end.

Document:

* Login
* Token/session
* Token storage
* Token refresh
* Middleware
* Protected routes
* Backend authorization
* FE permission checks
* Roles
* Permissions
* Expiration
* Logout

Clearly distinguish authentication from authorization.

---

# 11. ERROR HANDLING & FAILURE PATHS

Document:

* FE errors
* Router errors
* Backend exceptions
* Validation errors
* HTTP status mapping
* Error payloads
* Logging
* Retry
* Timeout
* Fallback

Identify errors that may be:

* Swallowed
* Lost
* Incorrectly transformed
* Inconsistently handled

---

# 12. EXTERNAL INTEGRATIONS

For every important external/internal integration:

| Integration | Consumer | Purpose | Request | Response | Failure Handling | Configuration |
| ----------- | -------- | ------- | ------- | -------- | ---------------- | ------------- |

Include source evidence.

---

# 13. KNOWN CAVEATS & TECHNICAL DEBT

Identify:

* TODO
* FIXME
* Workarounds
* Duplicated logic
* Dead code
* Fragile assumptions
* Potential bugs
* Performance concerns
* Security concerns
* Inconsistent contracts
* Missing validation

For every issue provide:

* Severity: Critical / High / Medium / Low
* File
* Symbol
* Evidence
* Problem
* Potential Impact
* Confidence

Do not classify unfamiliar code as a bug without evidence.

---

# 14. AUTHORITATIVE FILES & IMPORTANT SOURCES

Create:

| Area | Authoritative File/Module | Important Symbols | Purpose |
| ---- | ------------------------- | ----------------- | ------- |

Cover:

* Router
* API contracts
* Business logic
* Database access
* Models
* Request payloads
* Response payloads
* FE state
* Authentication
* Configuration
* Error handling

If multiple implementations exist, identify the likely authoritative implementation and explain why.

---

# 15. FUTURE LLM OPERATING GUIDE

This section is specifically for Qwen 3.7 Plus / DeepSeek.

Explain:

## When modifying Frontend

Where should the LLM start?

What API/service/store/hook dependencies must be checked?

## When modifying an API

Which Router, Handler, Service, Request DTO, Response DTO and FE consumers must be checked?

## When modifying Router behavior

Which middleware, authentication, authorization and payload contracts must be checked?

## When modifying Backend business logic

Which Service, Repository, Database model, API and FE consumers may be affected?

## When modifying Request/Response Payload

Which endpoints and FE consumers may break?

## When modifying Database

Which Models, Repositories, Services, APIs and FE consumers may be affected?

## When debugging

Provide a recommended investigation path:

`Symptom → FE → API → Router → Handler → Service → Repository/Query → DB/External Service → Response → FE`

Adapt this to the actual repository architecture.

---

# 16. SAFE CHANGE CHECKLIST

Create a repository-specific checklist future LLMs should follow before modifying code.

At minimum:

1. Identify the feature/module.
2. Locate the authoritative implementation.
3. Trace the end-to-end call chain.
4. Identify request/response contracts.
5. Check business rules.
6. Check invariants.
7. Identify all known consumers.
8. Check authentication/authorization.
9. Check error paths.
10. Make the smallest appropriate change.
11. Check backward compatibility.
12. Build/test affected components.
13. Verify API contracts.
14. Update documentation when architecture or contracts change.

Adapt this checklist to the actual repository.

---

# 17. KNOWN UNKNOWNS

List information that cannot be determined confidently from the repository.

For each:

* Unknown
* Why it is unknown
* Evidence that is missing
* Potential impact

---

# 18. TOP 20 FACTS FUTURE LLMS MUST KNOW

End the document with exactly **20 concise, high-value facts**.

Prioritize facts that prevent future LLMs from making incorrect changes.

Focus on:

* Architecture
* API contracts
* Business rules
* Invariants
* Authentication
* State management
* Critical dependencies
* Critical flows
* Dangerous assumptions
* Known pitfalls

---

# FINAL CONSISTENCY AUDIT

Before finalizing `LLM_SYSTEM_CONTEXT.md`, perform an internal consistency check.

Verify:

1. Router mappings match actual handlers.
2. Request DTOs match actual endpoint usage.
3. Response DTOs match actual responses.
4. FE consumers match documented APIs.
5. Database models match repository/service usage.
6. Business flow descriptions match actual implementation.
7. Authentication documentation matches middleware and FE behavior.
8. Important cross-layer dependencies are included.
9. Important call chains reach the actual DB query/external integration whenever possible.
10. Contradictions are explicitly documented.
11. Unsupported assumptions are not presented as facts.
12. No secrets are exposed.

If two parts of the repository contradict each other, document the contradiction and identify the actual implementation behavior.

---

# FINAL OUTPUT REQUIREMENTS

Produce exactly:

`LLM_SYSTEM_CONTEXT.md`

The document must be:

* Dense with useful technical information.
* Precise.
* Evidence-based.
* Optimized for LLM consumption.
* Searchable.
* Focused on cross-layer relationships.
* Focused on actual implementation.
* Focused on future code modification safety.

Do not waste space on generic explanations.

Do not expose secrets.

Do not invent information.

The repository is the source of truth.

**The most important requirement is accurate end-to-end traceability: Frontend → API → Router → Handler/Controller → Service → Repository/Query → Database/External Service → Response → Frontend.**
