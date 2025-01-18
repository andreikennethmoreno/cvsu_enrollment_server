import { StudentService } from '../services/studentService.js';
import { handleResponse } from '../utils/handleResponse.js';

const studentService = new StudentService();

export const getAllStudents = async (req, res) => {
  try {
    const students = await studentService.getAllStudents();
    return handleResponse(res, 200, students);
  } catch (error) {
    return handleResponse(res, 500, { error: 'Error Fetching Students' });
  }
};


export const getStudentById = async (req, res) => {
  try {
    // If the role is 'student', retrieve only their own data
    if (req.user.role === 'student') {
      if (req.user.id !== parseInt(req.params.id)) {
        return res.status(403).json({ error: 'Forbidden: You can only view your own data' });
      }
    }

    const student = await studentService.getStudentById(req.params.id);
    if (!student) {
      throw new Error('Student not found');
    }

    return handleResponse(res, 200, student);
  } catch (error) {
    return handleResponse(res, 404, { error: error.message });
  }
};


export const createStudent = async (req, res) => {
  const {
    first_name,
    last_name,
    contact_number,
    address,
    date_of_birth,
    student_type,
    standing_year,
    semester,
    password,
    program_id, // Include program_id
  } = req.body;

  // Check required fields, returning specific errors as expected
  const requiredFields = {
    first_name,
    last_name,
    contact_number,
    address,
    date_of_birth,
    student_type,
    standing_year,
    semester,
    password,
    program_id, // Validate program_id as required
  };

  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value) {
      return handleResponse(res, 400, {
        error: `${field.replace('_', ' ')} is required`,
      });
    }
  }

  try {
    const newStudent = await studentService.createStudent(req.body);
    return handleResponse(res, 201, newStudent);
  } catch (error) {
    return handleResponse(res, 500, { error: 'Error Creating Student' });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const updatedStudent = await studentService.updateStudent(req.params.id, req.body);
    return handleResponse(res, 200, updatedStudent);
  } catch (error) {
    return handleResponse(res, 404, { error: 'Student not found' });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await studentService.deleteStudent(req.params.id);
    return handleResponse(res, 200, deletedStudent); // Respond with the deleted student details
  } catch (error) {
    return handleResponse(res, 404, { error: 'Student not found' });
  }
};

