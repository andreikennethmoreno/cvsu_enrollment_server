// src/controllers/checklistController.js
import { ChecklistService } from '../services/checklistService.js';
import { handleResponse } from '../utils/handleResponse.js';

const checklistService = new ChecklistService();

export const getAllChecklists = async (req, res) => {
  try {
    const checklists = await checklistService.getAllChecklists();
    return handleResponse(res, 200, checklists);
  } catch (error) {
    return handleResponse(res, 500, { error: 'Error Fetching Checklists' });
  }
};

export const getChecklistById = async (req, res) => {
  try {
    const checklist = await checklistService.getChecklistById(req.params.id);
    if (!checklist) {
      throw new Error('Checklist not found');
    }
    return handleResponse(res, 200, checklist);
  } catch (error) {
    return handleResponse(res, 404, { error: error.message });
  }
};

export const getChecklistsByProgramId = async (req, res) => {
  try {
    const checklists = await checklistService.getChecklistsByProgramId(req.params.program_id);
    if (!checklists) {
      throw new Error('Checklists not found for this program');
    }
    return handleResponse(res, 200, checklists);
  } catch (error) {
    return handleResponse(res, 404, { error: error.message });
  }
};

export const getChecklistsByCourseCode = async (req, res) => {
  try {
    const checklists = await checklistService.getChecklistsByCourseCode(req.params.course_code);
    if (!checklists) {
      throw new Error('Checklists not found for this course');
    }
    return handleResponse(res, 200, checklists);
  } catch (error) {
    return handleResponse(res, 404, { error: error.message });
  }
};

export const createChecklist = async (req, res) => {
  const { program_id, year_level, semester, course_code, adviser_id, start_year, end_year } = req.body;

  // Check each required field for missing values
  const requiredFields = { program_id, year_level, semester, course_code, adviser_id, start_year, end_year };
  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value) {
      return handleResponse(res, 400, { error: `${field.replace('_', ' ')} is required` });
    }
  }

  try {
    const newChecklist = await checklistService.createChecklist(req.body);
    return handleResponse(res, 201, newChecklist);
  } catch (error) {
    return handleResponse(res, 500, { error: 'Error Creating Checklist' });
  }
};

export const updateChecklist = async (req, res) => {
  try {
    const updatedChecklist = await checklistService.updateChecklist(req.params.id, req.body);
    if (!updatedChecklist) {
      return handleResponse(res, 404, { error: 'Checklist not found' });
    }
    return handleResponse(res, 200, updatedChecklist);
  } catch (error) {
    return handleResponse(res, 500, { error: 'Error Updating Checklist' });
  }
};

export const deleteChecklist = async (req, res) => {
  try {
    const deletedChecklist = await checklistService.deleteChecklist(req.params.id);
    return handleResponse(res, 200, deletedChecklist);  // Respond with the deleted checklist details
  } catch (error) {
    return handleResponse(res, 404, { error: 'Checklist not found' });
  }
};
