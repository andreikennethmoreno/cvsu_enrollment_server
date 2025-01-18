// src/controllers/departmentHeadController.js
import { DepartmentHeadService } from '../services/departmentHeadService.js';
import { handleResponse } from '../utils/handleResponse.js';

const departmentHeadService = new DepartmentHeadService();

export const getAllDepartmentHeads = async (req, res) => {
  try {
    const departmentHeads = await departmentHeadService.getAllDepartmentHeads();
    return handleResponse(res, 200, departmentHeads);
  } catch (error) {
    return handleResponse(res, 500, { error: 'Error Fetching Department Heads' });
  }
};

export const getDepartmentHeadById = async (req, res) => {
  try {
    // If the role is 'department_head', retrieve only their own data
    if (req.user.role === 'department_head') {
      if (req.user.id !== parseInt(req.params.id)) {
        return res.status(403).json({ error: 'Forbidden: You can only view your own data' });
      }
    }

    const departmentHead = await departmentHeadService.getDepartmentHeadById(req.params.id);
    if (!departmentHead) {
      throw new Error('Department Head not found');
    }
    return handleResponse(res, 200, departmentHead);
  } catch (error) {
    return handleResponse(res, 404, { error: error.message });
  }
};


export const createDepartmentHead = async (req, res) => {
  const { first_name, last_name, password } = req.body;

  // Check each required field for missing values
  const requiredFields = { first_name, last_name, password };
  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value) {
      return handleResponse(res, 400, { error: `${field.replace('_', ' ')} is required` });
    }
  }
    const newDepartmentHead = await departmentHeadService.createDepartmentHead(req.body);
    return handleResponse(res, 201, newDepartmentHead);
  
};



export const updateDepartmentHead = async (req, res) => {
  try {
    // If the role is 'department_head', allow them to only update their own data
    if (req.user.role === 'department_head') {
      if (req.user.id !== parseInt(req.params.id)) {
        return res.status(403).json({ error: 'Forbidden: You can only update your own data' });
      }
    }

    const updatedDepartmentHead = await departmentHeadService.updateDepartmentHead(req.params.id, req.body);
    if (!updatedDepartmentHead) {
      return handleResponse(res, 404, { error: 'Department Head not found' });
    }
    return handleResponse(res, 200, updatedDepartmentHead);
  } catch (error) {
    return handleResponse(res, 500, { error: 'Error Updating Department Head' });
  }
};

export const deleteDepartmentHead = async (req, res) => {
  try {
    const deletedDepartmentHead = await departmentHeadService.deleteDepartmentHead(req.params.id);
    return handleResponse(res, 200, deletedDepartmentHead);  // Respond with the deleted department head details
  } catch (error) {
    return handleResponse(res, 404, { error: 'Department Head not found' });
  }
};
