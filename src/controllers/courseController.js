// src/controllers/courseController.js
import { CourseService } from '../services/courseService.js';
import { handleResponse } from '../utils/handleResponse.js';

const courseService = new CourseService();

export const getAllCourses = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();
    return handleResponse(res, 200, courses);
  } catch (error) {
    return handleResponse(res, 500, { error: 'Error Fetching Courses' });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await courseService.getCourseById(req.params.id);
    if (!course) {
      throw new Error('Course not found');
    }
    return handleResponse(res, 200, course);
  } catch (error) {
    return handleResponse(res, 404, { error: error.message });
  }
};

export const getCourseByCode = async (req, res) => {
  try {
    const course = await courseService.getCourseByCode(req.params.course_code);
    if (!course) {
      throw new Error('Course not found');
    }
    return handleResponse(res, 200, course);
  } catch (error) {
    return handleResponse(res, 404, { error: error.message });
  }
};

export const createCourse = async (req, res) => {
  const { course_code, course_title, credit_unit_lec, credit_unit_lab } = req.body;

  // Check each required field for missing values
  const requiredFields = { course_code, course_title, credit_unit_lec, credit_unit_lab };
  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value) {
      return handleResponse(res, 400, { error: `${field.replace('_', ' ')} is required` });
    }
  }

  try {
    const newCourse = await courseService.createCourse(req.body);
    return handleResponse(res, 201, newCourse);
  } catch (error) {
    return handleResponse(res, 500, { error: 'Error Creating Course' });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await courseService.updateCourse(req.params.id, req.body);
    if (!updatedCourse) {
      return handleResponse(res, 404, { error: 'Course not found' });
    }
    return handleResponse(res, 200, updatedCourse);
  } catch (error) {
    return handleResponse(res, 500, { error: 'Error Updating Course' });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await courseService.deleteCourse(req.params.id);
    return handleResponse(res, 200, deletedCourse);  // Respond with the deleted course details
  } catch (error) {
    return handleResponse(res, 404, { error: 'Course not found' });
  }
};
