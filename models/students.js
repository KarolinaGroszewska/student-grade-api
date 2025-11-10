import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
    course: { type: String, required: true },
    grade: { type: Number, required: true }
});

const studentSchema = new mongoose.Schema({
    //TODO: modify student IDs format to something else 
    id: { type: String, required: true, unique: true, match: /^S2025\d{4}$/ },
    //TODO: add graduation year
    name: { type: String, required: true },
    grades: [gradeSchema]
});

const Student = mongoose.model("Student", studentSchema);
export default Student;