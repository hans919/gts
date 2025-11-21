# API Quick Reference Guide

Base URL: `http://localhost:8000/api`

## Authentication

All endpoints except `/register` and `/login` require authentication.
Include the token in the Authorization header:
```
Authorization: Bearer {your-token-here}
```

### Register
```http
POST /register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123",
  "role": "graduate"  // or "admin"
}

Response: { "user": {...}, "token": "...", "token_type": "Bearer" }
```

### Login
```http
POST /login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: { "user": {...}, "token": "...", "token_type": "Bearer" }
```

### Logout
```http
POST /logout
Authorization: Bearer {token}

Response: { "message": "Logged out successfully" }
```

## Graduates

### List Graduates
```http
GET /graduates?page=1&search=john&program=Computer Science&graduation_year=2023
Authorization: Bearer {token}

Response: { "data": [...], "total": 100, "per_page": 15, "current_page": 1 }
```

### Create Graduate
```http
POST /graduates
Authorization: Bearer {token}
Content-Type: application/json

{
  "user_id": 1,
  "student_id": "2023001",
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "program": "Computer Science",
  "major": "Software Engineering",
  "graduation_year": 2023,
  "degree_level": "Bachelor's",
  "gpa": 3.75
}
```

### Get Graduate Details
```http
GET /graduates/{id}
Authorization: Bearer {token}

Response: { "id": 1, "first_name": "John", ..., "employments": [...], "survey_responses": [...] }
```

### Update Graduate
```http
PUT /graduates/{id}
Authorization: Bearer {token}
Content-Type: application/json

{ "phone": "+0987654321", "city": "New York" }
```

### Delete Graduate
```http
DELETE /graduates/{id}
Authorization: Bearer {token}

Response: { "message": "Graduate deleted successfully" }
```

## Employment

### List Employments
```http
GET /employments?graduate_id=1&employment_status=employed&is_current=true
Authorization: Bearer {token}
```

### Create Employment
```http
POST /employments
Authorization: Bearer {token}
Content-Type: application/json

{
  "graduate_id": 1,
  "company_name": "Tech Corp",
  "job_title": "Software Engineer",
  "employment_status": "employed",
  "job_type": "full-time",
  "industry": "Information Technology",
  "monthly_salary": 75000,
  "start_date": "2023-06-01",
  "is_current": true,
  "job_relevance": "highly_relevant",
  "job_satisfaction": 5
}
```

### Update Employment
```http
PUT /employments/{id}
Authorization: Bearer {token}
Content-Type: application/json

{ "monthly_salary": 85000, "job_satisfaction": 5 }
```

### Delete Employment
```http
DELETE /employments/{id}
Authorization: Bearer {token}
```

## Surveys

### List Surveys
```http
GET /surveys?status=active&page=1
Authorization: Bearer {token}

Response: { "data": [...], "total": 20, "per_page": 15, "current_page": 1 }
```

### Create Survey
```http
POST /surveys
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Graduate Employment Survey 2024",
  "description": "Annual survey for tracking graduate employment",
  "questions": [
    {
      "id": "q1",
      "type": "text",
      "question": "What is your current job title?",
      "required": true
    },
    {
      "id": "q2",
      "type": "select",
      "question": "How satisfied are you with your job?",
      "required": true,
      "options": ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"]
    },
    {
      "id": "q3",
      "type": "rating",
      "question": "Rate the relevance of your degree to your job (1-5)",
      "required": true,
      "validation": { "min": 1, "max": 5 }
    }
  ],
  "start_date": "2024-01-01",
  "end_date": "2024-12-31",
  "status": "active",
  "target_graduation_year": "2023",
  "is_anonymous": false
}
```

### Get Survey
```http
GET /surveys/{id}
Authorization: Bearer {token}

Response: { "id": 1, "title": "...", "questions": [...], "responses": [...] }
```

### Update Survey
```http
PUT /surveys/{id}
Authorization: Bearer {token}
Content-Type: application/json

{ "status": "closed", "end_date": "2024-06-30" }
```

### Delete Survey
```http
DELETE /surveys/{id}
Authorization: Bearer {token}
```

### Duplicate Survey
```http
POST /surveys/{id}/duplicate
Authorization: Bearer {token}

Response: { "id": 2, "title": "... (Copy)", "status": "draft", ... }
```

### Get Survey Responses
```http
GET /surveys/{id}/responses
Authorization: Bearer {token}

Response: [{ "id": 1, "graduate": {...}, "responses": {...}, "submitted_at": "..." }]
```

## Survey Responses

### List Responses
```http
GET /survey-responses?survey_id=1&is_complete=true
Authorization: Bearer {token}
```

### Create Response
```http
POST /survey-responses
Authorization: Bearer {token}
Content-Type: application/json

{
  "survey_id": 1,
  "graduate_id": 1,
  "responses": {
    "q1": "Software Engineer",
    "q2": "Very Satisfied",
    "q3": 5
  },
  "is_complete": false
}
```

### Update Response
```http
PUT /survey-responses/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "responses": {
    "q1": "Senior Software Engineer",
    "q2": "Very Satisfied",
    "q3": 5
  }
}
```

### Submit Response
```http
POST /survey-responses/{id}/submit
Authorization: Bearer {token}

Response: { "id": 1, "is_complete": true, "submitted_at": "2024-01-15T10:30:00Z" }
```

### Delete Response
```http
DELETE /survey-responses/{id}
Authorization: Bearer {token}
```

## Analytics

### Dashboard Stats
```http
GET /analytics/dashboard
Authorization: Bearer {token}

Response: {
  "total_graduates": 500,
  "total_surveys": 12,
  "active_surveys": 3,
  "total_responses": 450,
  "employment_stats": [...],
  "recent_graduates": [...]
}
```

### Employment Status Distribution
```http
GET /analytics/employment-status
Authorization: Bearer {token}

Response: [
  { "employment_status": "employed", "count": 350 },
  { "employment_status": "unemployed", "count": 50 },
  { "employment_status": "pursuing_higher_education", "count": 75 }
]
```

### Job Relevance
```http
GET /analytics/job-relevance
Authorization: Bearer {token}

Response: [
  { "job_relevance": "highly_relevant", "count": 200 },
  { "job_relevance": "relevant", "count": 120 },
  { "job_relevance": "somewhat_relevant", "count": 50 }
]
```

### Salary Distribution
```http
GET /analytics/salary-distribution
Authorization: Bearer {token}

Response: [
  { "salary_range": "30k-50k", "count": 100, "average": 40000 },
  { "salary_range": "50k-75k", "count": 150, "average": 62500 },
  { "salary_range": "75k-100k", "count": 80, "average": 87500 }
]
```

### Industry Distribution
```http
GET /analytics/industry-distribution
Authorization: Bearer {token}

Response: [
  { "industry": "Information Technology", "count": 180 },
  { "industry": "Finance", "count": 90 },
  { "industry": "Healthcare", "count": 75 }
]
```

### Program Outcomes
```http
GET /analytics/program-outcomes
Authorization: Bearer {token}

Response: [
  {
    "program": "Computer Science",
    "degree_level": "Bachelor's",
    "total_graduates": 150,
    "employed_count": 140,
    "avg_salary": 75000
  }
]
```

### Survey Completion Stats
```http
GET /analytics/survey-completion
Authorization: Bearer {token}

Response: [
  {
    "id": 1,
    "title": "Employment Survey 2024",
    "status": "active",
    "total_responses": 200,
    "completed_responses": 180
  }
]
```

### Graduates by Year
```http
GET /analytics/graduates-by-year
Authorization: Bearer {token}

Response: [
  { "graduation_year": 2024, "count": 120 },
  { "graduation_year": 2023, "count": 150 },
  { "graduation_year": 2022, "count": 145 }
]
```

## Common Response Codes

- `200 OK` - Success
- `201 Created` - Resource created successfully
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Authentication required or failed
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `422 Unprocessable Entity` - Validation failed
- `500 Internal Server Error` - Server error

## Error Response Format

```json
{
  "message": "Error description",
  "errors": {
    "field_name": ["Error message"]
  }
}
```

## Testing with cURL

### Example: Register and Login
```bash
# Register
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","password_confirmation":"password123","role":"admin"}'

# Login
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Use the token from login response
curl -X GET http://localhost:8000/api/graduates \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Testing with Postman

1. Create a new request
2. Set method and URL
3. Add Authorization header: `Bearer {token}`
4. Add Content-Type header: `application/json`
5. Add request body (for POST/PUT)
6. Send request

## Environment Variables

Create a collection variable in Postman:
- `base_url`: `http://localhost:8000/api`
- `token`: (set after login)

Then use `{{base_url}}/graduates` and `Bearer {{token}}`
