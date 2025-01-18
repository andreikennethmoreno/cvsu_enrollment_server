// src/controllers/adviserController.js
import { AdviserService } from '../services/adviserService.js';
import { handleResponse } from '../utils/handleResponse.js';

const adviserService = new AdviserService();

export const getAllAdvisers = async (req, res) => {
  try {
    const advisers = await adviserService.getAllAdvisers();
    return handleResponse(res, 200, advisers);
  } catch (error) {
    return handleResponse(res, 500, { error: 'Error Fetching Advisers' });
  }
};

export const getAdviserById = async (req, res) => {
  try {
    if (req.user.role === 'adviser') {
      if (req.user.id !== parseInt(req.params.id)) {
        return res.status(403).json({ error: 'Forbidden: You can only view your own data' });
      }
    }

    const adviser = await adviserService.getAdviserById(req.params.id);
    if (!adviser) {
      throw new Error('Adviser not found');
    }
    return handleResponse(res, 200, adviser);
  } catch (error) {
    return handleResponse(res, 404, { error: error.message });
  }
};

export const createAdviser = async (req, res) => {
  const { first_name, last_name, password } = req.body;

  // Check each required field for missing values
  const requiredFields = { first_name, last_name, password };
  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value) {
      return handleResponse(res, 400, { error: `${field.replace('_', ' ')} is required` });
    }
  }

  try {
    const newAdviser = await adviserService.createAdviser(req.body);
    return handleResponse(res, 201, newAdviser);
  } catch (error) {
    return handleResponse(res, 500, { error: 'Error creating adviser' });
  }
};

export const updateAdviser = async (req, res) => {
  try {
    if (req.user.role === 'adviser') {
      if (req.user.id !== parseInt(req.params.id)) {
        return res.status(403).json({ error: 'Forbidden: You can only update your own data' });
      }
    }

    const updatedAdviser = await adviserService.updateAdviser(req.params.id, req.body);
    if (!updatedAdviser) {
      return handleResponse(res, 404, { error: 'Adviser not found' });
    }
    return handleResponse(res, 200, updatedAdviser);
  } catch (error) {
    return handleResponse(res, 500, { error: 'Error Updating Adviser' });
  }
};

export const deleteAdviser = async (req, res) => {
  try {
    const deletedAdviser = await adviserService.deleteAdviser(req.params.id);
    return handleResponse(res, 200, deletedAdviser);
  } catch (error) {
    return handleResponse(res, 404, { error: 'Adviser not found' });
  }
};
