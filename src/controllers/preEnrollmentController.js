// src/controllers/preEnrollmentController.js
import { PreEnrollmentService } from '../services/preEnrollmentService.js';
import { handleResponse } from '../utils/handleResponse.js';

const preEnrollmentService = new PreEnrollmentService();

export const getAllPreEnrollments = async (req, res) => {
  try {
    const preEnrollments = await preEnrollmentService.getAllPreEnrollments();
    return handleResponse(res, 200, preEnrollments);
  } catch (error) {
    return handleResponse(res, 500, { error: 'Error Fetching Pre-Enrollments' });
  }
};

export const getPreEnrollmentById = async (req, res) => {
  try {
    const preEnrollment = await preEnrollmentService.getPreEnrollmentById(req.params.id);
    if (!preEnrollment) {
      throw new Error('Pre-Enrollment not found');
    }
    return handleResponse(res, 200, preEnrollment);
  } catch (error) {
    return handleResponse(res, 404, { error: error.message });
  }
};

export const createPreEnrollment = async (req, res) => {
  const {
    last_name,
    first_name,
    date_of_birth,
    email_address,
    mobile_number,
  } = req.body;

  // Define required fields for pre-enrollment
  const requiredFields = { last_name, first_name, date_of_birth, email_address, mobile_number };

  // Validate required fields
  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value) {
      return handleResponse(res, 400, { error: `${field.replace('_', ' ')} is required` });
    }
  }

  try {
    // Create a new pre-enrollment record
    const newPreEnrollment = await preEnrollmentService.createPreEnrollment(req.body);
    return handleResponse(res, 201, newPreEnrollment);
  } catch (error) {
    console.error('Error creating pre-enrollment:', error.message);
    return handleResponse(res, 500, { error: 'Error Creating Pre-Enrollment' });
  }
};


export const updatePreEnrollment = async (req, res) => {
  try {
    const updatedPreEnrollment = await preEnrollmentService.updatePreEnrollment(req.params.id, req.body);
    if (!updatedPreEnrollment) {
      return handleResponse(res, 404, { error: 'Pre-Enrollment not found' });
    }
    return handleResponse(res, 200, updatedPreEnrollment);
  } catch (error) {
    return handleResponse(res, 500, { error: 'Error Updating Pre-Enrollment' });
  }
};

export const deletePreEnrollment = async (req, res) => {
  try {
    const deletedPreEnrollment = await preEnrollmentService.deletePreEnrollment(req.params.id);
    return handleResponse(res, 200, deletedPreEnrollment); // Respond with the deleted pre-enrollment details
  } catch (error) {
    return handleResponse(res, 404, { error: 'Pre-Enrollment not found' });
  }
};
