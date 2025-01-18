import { ProgramService } from '../services/programService.js';
import { handleResponse } from '../utils/handleResponse.js';

const programService = new ProgramService();

// Get all programs
export const getAllPrograms = async (req, res) => {
  try {
    const programs = await programService.getAllPrograms();
    return handleResponse(res, 200, programs);
  } catch (error) {
    return handleResponse(res, 500, { error: 'Error Fetching Programs' });
  }
};

// Get a program by ID
export const getProgramById = async (req, res) => {
  try {
    const program = await programService.getProgramById(req.params.id);
    if (!program) {
      throw new Error('Program not found');
    }
    return handleResponse(res, 200, program);
  } catch (error) {
    return handleResponse(res, 404, { error: error.message });
  }
};

// Create a new program
export const createProgram = async (req, res) => {
  const { program_name } = req.body;

  // Check each required field for missing values
  const requiredFields = { program_name };
  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value) {
      return handleResponse(res, 400, { error: `${field.replace('_', ' ')} is required` });
    }
  }

  try {
    // Call the service layer to create the program
    const newProgram = await programService.createProgram(req.body);
    return handleResponse(res, 201, newProgram);
  } catch (error) {
    console.error("Error creating program:", error); // Log any error that occurs
    return handleResponse(res, 500, { error: 'Error creating Program' });
  }
};


// Update an existing program
export const updateProgram = async (req, res) => {
  try {
    const updatedProgram = await programService.updateProgram(req.params.id, req.body);
    if (!updatedProgram) {
      return handleResponse(res, 404, { error: 'Program not found' });
    }
    return handleResponse(res, 200, updatedProgram);
  } catch (error) {
    return handleResponse(res, 500, { error: 'Error updating Program' });
  }
};

// Delete a program by ID
export const deleteProgram = async (req, res) => {
  try {
    const deletedProgram = await programService.deleteProgram(req.params.id);
    return handleResponse(res, 200, deletedProgram); // Respond with the deleted program details
  } catch (error) {
    return handleResponse(res, 404, { error: 'Program not found' });
  }
};
