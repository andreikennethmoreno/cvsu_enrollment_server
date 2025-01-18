// src/controllers/coursePrerequisiteController.js
import { CoursePrerequisiteService } from '../services/coursePrerequisiteService.js';
import { handleResponse } from '../utils/handleResponse.js';

const coursePrerequisiteService = new CoursePrerequisiteService();

export const getAllCoursePrerequisites = async (req, res) => {
  try {
    const coursePrerequisites = await coursePrerequisiteService.getAllCoursePrerequisites();
    return handleResponse(res, 200, coursePrerequisites);
  } catch (error) {
    return handleResponse(res, 500, { error: 'Error Fetching Course Prerequisites' });
  }
};

export const getCoursePrerequisiteById = async (req, res) => {
  try {
    const coursePrerequisite = await coursePrerequisiteService.getCoursePrerequisiteById(req.params.id);
    if (!coursePrerequisite) {
      throw new Error('Course Prerequisite not found');
    }
    return handleResponse(res, 200, coursePrerequisite);
  } catch (error) {
    return handleResponse(res, 404, { error: error.message });
  }
};

export const getCoursePrerequisitesByCourseCode = async (req, res) => {
  try {
    const coursePrerequisites = await coursePrerequisiteService.getCoursePrerequisitesByCourseCode(req.params.course_code);
    if (!coursePrerequisites) {
      throw new Error('Course Prerequisites not found');
    }
    return handleResponse(res, 200, coursePrerequisites);
  } catch (error) {
    return handleResponse(res, 404, { error: error.message });
  }
};

export const createCoursePrerequisite = async (req, res) => {
  const { course_code, prerequisite_course_code } = req.body;

  // Check each required field for missing values
  const requiredFields = { course_code, prerequisite_course_code };
  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value) {
      return handleResponse(res, 400, { error: `${field.replace('_', ' ')} is required` });
    }
  }

  try {
    const newCoursePrerequisite = await coursePrerequisiteService.createCoursePrerequisite(req.body);
    return handleResponse(res, 201, newCoursePrerequisite);
  } catch (error) {
    return handleResponse(res, 500, { error: 'Error Creating Course Prerequisite' });
  }
};

export const updateCoursePrerequisite = async (req, res) => {
  try {
    const updatedCoursePrerequisite = await coursePrerequisiteService.updateCoursePrerequisite(req.params.id, req.body);
    if (!updatedCoursePrerequisite) {
      return handleResponse(res, 404, { error: 'Course Prerequisite not found' });
    }
    return handleResponse(res, 200, updatedCoursePrerequisite);
  } catch (error) {
    return handleResponse(res, 500, { error: 'Error Updating Course Prerequisite' });
  }
};

export const deleteCoursePrerequisite = async (req, res) => {
  try {
    const deletedCoursePrerequisite = await coursePrerequisiteService.deleteCoursePrerequisite(req.params.id);
    return handleResponse(res, 200, deletedCoursePrerequisite);  // Respond with the deleted course prerequisite details
  } catch (error) {
    return handleResponse(res, 404, { error: 'Course Prerequisite not found' });
  }
};
