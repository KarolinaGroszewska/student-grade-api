import express from "express";
import path from "path";
import { loadStudents, saveStudents } from "../server.js";


const router = express.Router();
const dataPath = path.resolve("./data/students.json");

// GET /students – Get all students
router.get("/", (req, res) => {
  const students = loadStudents();
  res.json(students);
});

// GET /students/:id – Get a student by ID
router.get("/:id", (req, res) => {
  const students = loadStudents();
  const student = students.find((s) => s.id === req.params.id);
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ error: "Student not found" });
  }
});

// POST /students – Add a new student
router.post("/", (req, res) => {
  const students = loadStudents();
  const { id, name, grades } = req.body;

  if (!id || !name || !grades) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  if (students.some((s) => s.id === id)) {
    return res.status(400).json({ error: "Student ID already exists" });
  }

  const newStudent = { id, name, grades };
  students.push(newStudent);
  saveStudents(students);

  res.status(201).json(newStudent);
});

// PUT /students/:id – Update a student by ID
router.put("/:id", (req, res) => {
  const students = loadStudents();
  const student = students.find((s) => s.id === req.params.id);

  if (!student) return res.status(404).json({ error: "Student not found" });

  const { name, grades } = req.body;
  if (name) student.name = name;
  if (grades) student.grades = grades;

  saveStudents(students);
  res.json(student);
});

// DELETE /students/:id – Delete a student by ID
router.delete("/:id", (req, res) => {
  const students = loadStudents();
  const index = students.findIndex((s) => s.id === req.params.id);

  if (index === -1) return res.status(404).json({ error: "Student not found" });

  const deletedStudent = students.splice(index, 1)[0];
  saveStudents(students);

  res.json(deletedStudent);
});

// GET /students/:id/average – Get a student's average grade
router.get("/:id/average", (req, res) => {
  const students = loadStudents();
  const student = students.find((s) => s.id === req.params.id);

  if (!student) return res.status(404).json({ error: "Student not found" });

  const average =
    student.grades.reduce((sum, g) => sum + g.score, 0) / student.grades.length;
  res.json({ average });
});

// GET /students/:id/subjects – Get a student's subjects
router.get("/:id/subjects", (req, res) => {
  const students = loadStudents();
  const student = students.find((s) => s.id === req.params.id);

  if (!student) return res.status(404).json({ error: "Student not found" });

  const subjects = student.grades.map((g) => g.subject);
  res.json({ subjects });
});

export default router;