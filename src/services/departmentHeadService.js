// src/services/departmentHeadService.js
import { DepartmentHeadRepository } from '../repositories/departmentHeadRepository.js';

export class DepartmentHeadService {
  constructor() {
    this.departmentHeadRepository = new DepartmentHeadRepository();
  }

  // Get all department heads
  async getAllDepartmentHeads() {
    return await this.departmentHeadRepository.getAll();
  }

  // Get a department head by ID
  async getDepartmentHeadById(id) {
    return await this.departmentHeadRepository.getById(id);
  }

  // Create a new department head
  async createDepartmentHead(departmentHeadData) {
    return await this.departmentHeadRepository.create(departmentHeadData);
  }

  // Update an existing department head
  async updateDepartmentHead(id, departmentHeadData) {
    return await this.departmentHeadRepository.update(id, departmentHeadData);
  }

  // Delete a department head by ID
  async deleteDepartmentHead(id) {
    return await this.departmentHeadRepository.delete(id);
  }

  // Verify the password for a department head
  async verifyPassword(departmentHead, plainPassword) {
    return await this.departmentHeadRepository.verifyPassword(departmentHead, plainPassword);
  }
}

export default DepartmentHeadService;
