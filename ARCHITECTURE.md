# Graduate Tracer System - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         GRADUATE TRACER SYSTEM                       │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                            FRONTEND LAYER                            │
│                     React + TypeScript + Vite                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │   Pages      │  │  Components  │  │   Contexts   │              │
│  │              │  │              │  │              │              │
│  │ - Dashboard  │  │ - Layout     │  │ - Auth       │              │
│  │ - Graduates  │  │ - Tables     │  │ - Theme      │              │
│  │ - Surveys    │  │ - Forms      │  │              │              │
│  │ - Analytics  │  │ - Charts     │  │              │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────┐       │
│  │              React Query (TanStack Query)                │       │
│  │          Data Fetching & State Management                │       │
│  └──────────────────────────────────────────────────────────┘       │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────┐       │
│  │                   API Service Layer                       │       │
│  │  - auth.service.ts    - graduate.service.ts              │       │
│  │  - survey.service.ts  - analytics.service.ts             │       │
│  └──────────────────────────────────────────────────────────┘       │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────┐       │
│  │              Axios HTTP Client with                       │       │
│  │         Interceptors (Auth, Error Handling)              │       │
│  └──────────────────────────────────────────────────────────┘       │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                                   │ HTTP/JSON
                                   │ (REST API)
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          BACKEND API LAYER                           │
│                         Laravel 11 + Sanctum                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────────────────────────────────────────────┐       │
│  │                    API Routes (api.php)                   │       │
│  │    - Authentication  - Graduates  - Surveys              │       │
│  │    - Employments    - Analytics                          │       │
│  └──────────────────────────────────────────────────────────┘       │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────┐       │
│  │                   Middleware Layer                        │       │
│  │    - auth:sanctum  - throttle  - cors                    │       │
│  └──────────────────────────────────────────────────────────┘       │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────┐       │
│  │                    Controllers                            │       │
│  │  - AuthController      - GraduateController              │       │
│  │  - SurveyController    - EmploymentController            │       │
│  │  - SurveyResponseController  - AnalyticsController       │       │
│  └──────────────────────────────────────────────────────────┘       │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────┐       │
│  │                 Eloquent ORM Models                       │       │
│  │  - User        - Graduate      - Survey                  │       │
│  │  - Employment  - SurveyResponse                          │       │
│  └──────────────────────────────────────────────────────────┘       │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                                   │ SQL Queries
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          DATABASE LAYER                              │
│                      SQLite / MySQL / PostgreSQL                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │    users     │  │  graduates   │  │   surveys    │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
│                                                                       │
│  ┌──────────────┐  ┌──────────────┐                                 │
│  │ employments  │  │  survey_     │                                 │
│  │              │  │  responses   │                                 │
│  └──────────────┘  └──────────────┘                                 │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

## Database Entity Relationship Diagram

```
┌─────────────────────┐
│       users         │
├─────────────────────┤
│ id (PK)            │
│ name               │
│ email              │
│ password           │
│ role               │◄────────────────┐
│ created_at         │                 │
│ updated_at         │                 │
└─────────────────────┘                 │
         │                              │
         │ 1                            │
         │                              │
         │ N                            │
         ▼                              │
┌─────────────────────┐                 │
│     graduates       │                 │
├─────────────────────┤                 │
│ id (PK)            │                 │
│ user_id (FK) ──────┼─────────────────┘
│ student_id         │
│ first_name         │
│ last_name          │
│ email              │
│ phone              │
│ program            │
│ graduation_year    │
│ degree_level       │
│ gpa                │
│ ...                │
└─────────────────────┘
         │
         │ 1
         │
         │ N
         ├─────────────────────┐
         │                     │
         ▼                     ▼
┌─────────────────────┐  ┌─────────────────────┐
│   employments       │  │  survey_responses   │
├─────────────────────┤  ├─────────────────────┤
│ id (PK)            │  │ id (PK)            │
│ graduate_id (FK) ──┼──┤ graduate_id (FK)   │
│ company_name       │  │ survey_id (FK) ────┼──┐
│ job_title          │  │ responses (JSON)   │  │
│ employment_status  │  │ submitted_at       │  │
│ monthly_salary     │  │ is_complete        │  │
│ start_date         │  └─────────────────────┘  │
│ is_current         │                            │
│ job_relevance      │                            │
│ ...                │                            │
└─────────────────────┘                            │
                                                   │
                                                   │
                                    ┌──────────────┘
                                    │ N
                                    │
                                    │ 1
                                    ▼
                              ┌─────────────────────┐
                              │      surveys        │
                              ├─────────────────────┤
                              │ id (PK)            │
                              │ title              │
                              │ description        │
                              │ questions (JSON)   │
                              │ start_date         │
                              │ end_date           │
                              │ status             │
                              │ is_anonymous       │
                              └─────────────────────┘
```

## Data Flow Diagram

### Authentication Flow
```
┌──────────┐         ┌──────────┐         ┌──────────┐         ┌──────────┐
│          │         │          │         │          │         │          │
│  User    │────────▶│  Login   │────────▶│  Auth    │────────▶│  Token   │
│  Input   │         │  Page    │         │ Service  │         │  Storage │
│          │         │          │         │          │         │          │
└──────────┘         └──────────┘         └──────────┘         └──────────┘
                          │                     │
                          │                     ▼
                          │            ┌──────────────────┐
                          │            │  Laravel API     │
                          │            │  /api/login      │
                          │            └──────────────────┘
                          │                     │
                          │                     ▼
                          │            ┌──────────────────┐
                          │            │  Sanctum Auth    │
                          │            │  Token Created   │
                          │            └──────────────────┘
                          │                     │
                          └─────────────────────┘
                                    Token Returned
```

### Graduate Management Flow
```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│             │         │             │         │             │
│  Admin      │────────▶│  Graduate   │────────▶│  Graduate   │
│  Dashboard  │         │  List Page  │         │  Form       │
│             │         │             │         │             │
└─────────────┘         └─────────────┘         └─────────────┘
                                │                       │
                                │                       │
                                ▼                       ▼
                        ┌─────────────┐         ┌─────────────┐
                        │  GET        │         │  POST       │
                        │  /graduates │         │  /graduates │
                        └─────────────┘         └─────────────┘
                                │                       │
                                │                       │
                                ▼                       ▼
                        ┌─────────────────────────────────┐
                        │     Graduate Controller         │
                        │     - index()                   │
                        │     - store()                   │
                        └─────────────────────────────────┘
                                        │
                                        ▼
                        ┌─────────────────────────────────┐
                        │        Database                 │
                        │     graduates table             │
                        └─────────────────────────────────┘
```

### Survey Response Flow
```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│             │         │             │         │             │
│  Graduate   │────────▶│  Survey     │────────▶│  Survey     │
│  Portal     │         │  List       │         │  Form       │
│             │         │             │         │             │
└─────────────┘         └─────────────┘         └─────────────┘
                                                        │
                                                        │ Fill & Submit
                                                        ▼
                                                ┌─────────────┐
                                                │  POST       │
                                                │  /survey-   │
                                                │  responses  │
                                                └─────────────┘
                                                        │
                                                        ▼
                                        ┌───────────────────────────┐
                                        │  SurveyResponseController │
                                        │  - store()                │
                                        │  - submit()               │
                                        └───────────────────────────┘
                                                        │
                                                        ▼
                                        ┌───────────────────────────┐
                                        │      Database             │
                                        │  survey_responses table   │
                                        └───────────────────────────┘
```

### Analytics Dashboard Flow
```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│             │         │             │         │             │
│  Admin      │────────▶│  Analytics  │────────▶│  Multiple   │
│  Clicks     │         │  Dashboard  │         │  API Calls  │
│  Analytics  │         │  Loads      │         │             │
│             │         │             │         │             │
└─────────────┘         └─────────────┘         └─────────────┘
                                                        │
                    ┌───────────────────────────────────┤
                    │           │           │           │
                    ▼           ▼           ▼           ▼
            ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
            │Employment│ │   Job    │ │  Salary  │ │ Industry │
            │  Status  │ │Relevance │ │   Dist   │ │   Dist   │
            └──────────┘ └──────────┘ └──────────┘ └──────────┘
                    │           │           │           │
                    └───────────┴───────────┴───────────┘
                                    │
                                    ▼
                        ┌───────────────────────┐
                        │  AnalyticsController  │
                        │  - Various methods    │
                        └───────────────────────┘
                                    │
                                    ▼
                        ┌───────────────────────┐
                        │  Database Queries     │
                        │  - Aggregations       │
                        │  - Grouping           │
                        │  - Calculations       │
                        └───────────────────────┘
                                    │
                                    ▼
                        ┌───────────────────────┐
                        │   Chart Components    │
                        │   (Recharts)          │
                        └───────────────────────┘
```

## API Request/Response Flow

```
Frontend                         Backend                      Database
   │                               │                              │
   │  1. HTTP Request              │                              │
   │  GET /api/graduates           │                              │
   │  + Auth Token                 │                              │
   ├──────────────────────────────▶│                              │
   │                               │                              │
   │                               │  2. Middleware Check         │
   │                               │  - Authenticate              │
   │                               │  - Authorize                 │
   │                               │                              │
   │                               │  3. Route to Controller      │
   │                               │  GraduateController@index    │
   │                               │                              │
   │                               │  4. Query Database           │
   │                               ├─────────────────────────────▶│
   │                               │                              │
   │                               │  5. Return Data              │
   │                               │◀─────────────────────────────┤
   │                               │                              │
   │                               │  6. Format Response          │
   │                               │  - Apply relationships       │
   │                               │  - Pagination                │
   │                               │                              │
   │  7. JSON Response             │                              │
   │◀──────────────────────────────┤                              │
   │                               │                              │
   │  8. Update UI                 │                              │
   │  - React Query Cache          │                              │
   │  - Component Re-render        │                              │
   │                               │                              │
```

## Component Hierarchy (Frontend - To Be Built)

```
App
├── AuthProvider (Context)
│   └── Router
│       ├── PublicRoutes
│       │   ├── Login
│       │   └── Register
│       │
│       └── ProtectedRoutes
│           └── Layout
│               ├── Header
│               │   ├── Logo
│               │   ├── Navigation
│               │   └── UserMenu
│               │
│               ├── Sidebar
│               │   └── NavigationLinks
│               │
│               └── MainContent
│                   ├── Dashboard
│                   │   ├── StatsCards
│                   │   ├── Charts
│                   │   └── RecentActivity
│                   │
│                   ├── Graduates
│                   │   ├── GraduateTable
│                   │   ├── GraduateForm
│                   │   └── GraduateDetails
│                   │       └── EmploymentHistory
│                   │
│                   ├── Surveys
│                   │   ├── SurveyList
│                   │   ├── SurveyBuilder
│                   │   ├── SurveyForm
│                   │   └── SurveyResults
│                   │
│                   └── Analytics
│                       ├── EmploymentChart
│                       ├── SalaryChart
│                       ├── IndustryChart
│                       └── ProgramOutcomes
```

## Technology Integration

```
┌───────────────────────────────────────────────────────────────┐
│                        FRONTEND STACK                          │
├───────────────────────────────────────────────────────────────┤
│                                                                 │
│  React 18 ─────────── UI Library & Component Management       │
│  TypeScript ────────── Type Safety & IntelliSense             │
│  Vite ─────────────── Fast Build Tool & Dev Server            │
│  ShadcnUI ─────────── Pre-built UI Components                 │
│  Tailwind CSS ──────── Utility-first Styling                  │
│  TanStack Query ─────── Data Fetching & Caching               │
│  React Router ──────── Client-side Routing                    │
│  Axios ────────────── HTTP Client with Interceptors           │
│  Recharts ─────────── Data Visualization                      │
│  React Hook Form ───── Form Management                        │
│  Zod ──────────────── Schema Validation                       │
│                                                                 │
└───────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────┐
│                        BACKEND STACK                           │
├───────────────────────────────────────────────────────────────┤
│                                                                 │
│  Laravel 11 ────────── PHP Framework                           │
│  Eloquent ORM ──────── Database ORM                            │
│  Laravel Sanctum ───── API Authentication                      │
│  SQLite/MySQL ──────── Database                                │
│  Composer ─────────── Dependency Management                    │
│                                                                 │
└───────────────────────────────────────────────────────────────┘
```

---

This architecture provides:
- **Separation of Concerns**: Clear layers for frontend, backend, and database
- **Scalability**: Modular design allows easy expansion
- **Maintainability**: Well-organized code structure
- **Security**: Token-based authentication with Sanctum
- **Performance**: React Query for caching, optimized queries
- **Developer Experience**: TypeScript, hot reload, comprehensive types
