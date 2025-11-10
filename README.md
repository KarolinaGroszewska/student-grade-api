# Student Grades API Documentation
**Base URL (Production):** `https://student-grade-api-bvmg.onrender.com`
**Base URL (Local):** `https://localhost:3001`


## **Description:**
Built for **GHW: API Week (November 2025)**.  
This project demonstrates how to design, document, and deploy a high-quality REST API using **Node.js**, **Express**, and **MongoDB Atlas**.  
The API provides access to student data — including subjects, grades, and calculated averages — and now persists data in a MongoDB database rather than a local file.
---

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/students` | **GET** | Retrieve a list of all students. |
| `/students/:id` | **GET** | Retrieve a single student by ID. |
| `/students` | **POST** | Add a new student. Requires JSON body with `id` (format `S2025XXXX`), `name`, and `grades`. |
| `/students/:id` | **PUT** | Update a student’s name and/or grades. Appends new grades if provided. |
| `/students/:id/grades` | **PATCH** | Append one or more grades to a student. Requires JSON body with `grades` array. |
| `/students/:id` | **DELETE** | Delete a student by ID. |
| `/students/:id/average` | **GET** | Get the average score of all the student’s grades. |
| `/students/:id/subjects` | **GET** | Get a list of all subjects the student is enrolled in. |

---
### Notes
- Student IDs must follow the format S2025XXXX.
- Example Student Data
```json
{
  "id": "S20250042",
  "name": "Ryan Smith",
  "grades": [
    { "subject": "MATH101", "score": 88 },
    { "subject": "CS101", "score": 94 },
    { "subject": "ENG201", "score": 82 }
  ]
}
```
## Running Locally
1. Clone and Install
```
git clone https://github.com/<your-username>/student-grade-api.git
cd student-grade-api
npm install
```
2. Add Environment Variables
Create a `.env` file, and a MongoDB instance.
```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/studentDB
```
3. Start the server with `npm start`
## Curl Commands for Local Testing

### Get all students
You can find additional test data in `/data/students.json`
```
curl -X GET http://localhost:3001/students
```
### Get a single student
```
curl -X GET http://localhost:3001/students/[id]
```
### Add a new student
```
curl -X POST http://localhost:3001/students \
  -H "Content-Type: application/json" \
  - d '{"id": [id], "name": [name], "grades:" [{"subject": [subjectName], "score": [score]}]}'
```
### Update a student
```
curl -X PUT http://localhost:3001/students/[id] \
  -H "Content-Type: application/json" \
  -d '{"name": [name], "grades:" [{"subject": [subjectName], "score": [score]}]}'
```
### Append grades (PUT)
```
curl -X PATCH http://localhost:3001/students/[id] \ 
  -H "Content-Type: application/json" \
  d '{"grades:" [{"subject": [subjectName], "score": [score]}]}'
```
### Delete a student
```
curl -X DELETE http://localhost:3001/students/[id]
```
### Get a student's average grade
```
curl -X GET http://localhost:3001/students/[id]/average
```
### Get a student's subjects
```
curl -X GET http://localhost:3001/students/[id]/subjects
```
