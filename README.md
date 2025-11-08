# Student Grades API Documentation
**Base URL:** `http://localhost:3001`

**Description:**
Built for GHW: API Week (November 2025). Introductory API build focusing on documenting and deploying a high-quality API, focusing on student grade data. 

---

## Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/students` | GET | Retrieve a list of all students. |
| `/students/:id` | GET | Retrieve a single student by their ID. |
| `/students` | POST | Add a new student. Requires JSON body with `id`, `name`, and `grades`. |
| `/students/:id` | PUT | Update a student's name and/or grades. Overwrites the `grades` array. |
| `/students/:id` | DELETE | Delete a student by ID. |
| `/students/:id/average` | GET | Get the average score of all the student’s grades. |
| `/students/:id/subjects` | GET | Get a list of all subjects the student is enrolled in. |

### Notes
- All data is persisted in `students.json`.
- Student IDs must be unique.
- JSON format for students:
```json
{
  "id": "string",
  "name": "string",
  "grades": [{ "subject": "string", "score": 0-100 }]
}
```
- PUT requests overwrite the full grades array; to add a single class, modify the route accordingly.

## Curl Commands

#### Get all students
You can find test data in `/data/students.json`

```
curl -X GET http://localhost:3001/students
```
#### Get a single student

```
curl -X GET http://localhost:3001/students/[id]
```
#### Add a new student
```
curl -X POST http://localhost:3001/students \
  -H "Content-Type: application/json" \
  - d '{"id": [id], "name": [name], "grades:" [{"subject": [subjectName], "score": [score]}]}'
```
#### Update a student
```
curl -X PUT http://localhost:3001/students/[id] \
  -H "Content-Type: application/json" \
  -d '{"name": [name], "grades:" [{"subject": [subjectName], "score": [score]}]}'
```
#### Delete a student
```
curl -X DELETE http://localhost:3001/students/[id]
```
#### Get a student's average grade
```
curl -X GET http://localhost:3001/students/[id]/average
```
#### Get a student's subjects
```
curl -X GET http://localhost:3001/students/[id]/subjects
```