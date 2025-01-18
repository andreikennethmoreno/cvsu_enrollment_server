// src/services/checklistService.js
import { ChecklistRepository } from '../repositories/checklistRepository.js';

export class ChecklistService {
  constructor() {
    this.checklistRepository = new ChecklistRepository();
  }

  // Get all checklists
  async getAllChecklists() {
    return await this.checklistRepository.getAll();
  }

  // Get a checklist by ID
  async getChecklistById(id) {
    return await this.checklistRepository.getById(id);
  }

  // Create a new checklist
  async createChecklist(checklistData) {
    return await this.checklistRepository.create(checklistData);
  }

  // Update an existing checklist
  async updateChecklist(id, checklistData) {
    return await this.checklistRepository.update(id, checklistData);
  }

  // Delete a checklist by ID
  async deleteChecklist(id) {
    return await this.checklistRepository.delete(id);
  }

  // Get checklists by program ID
  async getChecklistsByProgramId(program_id) {
    return await this.checklistRepository.getByProgramId(program_id);
  }

  // Get checklists by course code
  async getChecklistsByCourseCode(course_code) {
    return await this.checklistRepository.getByCourseCode(course_code);
  }
}

export default ChecklistService;
