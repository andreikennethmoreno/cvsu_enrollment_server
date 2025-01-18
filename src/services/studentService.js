// src/services/studentService.js
import { StudentRepository } from '../repositories/studentRepository.js';

export class StudentService {
  constructor() {
    this.studentRepository = new StudentRepository();
  }

  // Get all students
  async getAllStudents() {
    return await this.studentRepository.getAll(); // Using the base repository method
  }

  // Get a student by ID
  async getStudentById(id) {
    return await this.studentRepository.getById(id); // Using the base repository method
  }

  // Create a new student
  async createStudent(studentData) {
    return await this.studentRepository.create(studentData); // Using the base repository method
  }

  // Update an existing student
  async updateStudent(id, studentData) {
    return await this.studentRepository.update(id, studentData); // Using the base repository method
  }

  // Delete a student by ID
  async deleteStudent(id) {
    return await this.studentRepository.delete(id); // Using the base repository method
  }
}

export default StudentService;
