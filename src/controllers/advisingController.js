// src/controllers/advisingController.js
import AdvisingService from '../services/advisingService.js';
import { handleResponse } from '../utils/handleResponse.js';

const advisingService = new AdvisingService();

export const getAllAdvisings = async (req, res) => {
  try {
    const advisings = await advisingService.getAllAdvisings();
    return handleResponse(res, 200, advisings);
  } catch (error) {
    return handleResponse(res, 500, { error: 'Error Fetching Advisings' });
  }
};

export const getAdvisingById = async (req, res) => {
  try {
    const advising = await advisingService.getAdvisingById(req.params.id);
    if (!advising) {
      throw new Error('Advising not found');
    }
    return handleResponse(res, 200, advising);
  } catch (error) {
    return handleResponse(res, 404, { error: error.message });
  }
};

export const createAdvising = async (req, res) => {
  const { student_id, student_course_checklist, adviser_id } = req.body;

  // Check required fields
  const requiredFields = { student_id, student_course_checklist, adviser_id };
  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value) {
      return handleResponse(res, 400, { error: `${field.replace('_', ' ')} is required` });
    }
  }

  try {
    console.log("submitting" + student_id + student_course_checklist + adviser_id);
    const newAdvising = await advisingService.createAdvising(req.body);
    return handleResponse(res, 201, newAdvising);
  } catch (error) {
    return handleResponse(res, 500, { error: 'Error Creating Advising' });
  }
};

export const updateAdvising = async (req, res) => {
  try {
    const updatedAdvising = await advisingService.updateAdvising(req.params.id, req.body);
    if (!updatedAdvising) {
      return handleResponse(res, 404, { error: 'Advising not found' });
    }
    return handleResponse(res, 200, updatedAdvising);
  } catch (error) {
    return handleResponse(res, 500, { error: 'Error Updating Advising' });
  }
};

export const deleteAdvising = async (req, res) => {
  try {
    const deletedAdvising = await advisingService.deleteAdvising(req.params.id);
    return handleResponse(res, 200, deletedAdvising); // Respond with the deleted advising details
  } catch (error) {
    return handleResponse(res, 404, { error: 'Advising not found' });
  }
};
