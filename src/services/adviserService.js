// src/services/adviserService.js
import { AdviserRepository } from '../repositories/adviserRepository.js';

export class AdviserService {
  constructor() {
    this.adviserRepository = new AdviserRepository();
  }

  // Get all advisers
  async getAllAdvisers() {
    return await this.adviserRepository.getAll();
  }

  // Get an adviser by ID
  async getAdviserById(id) {
    return await this.adviserRepository.getById(id);
  }

  // Create a new adviser
  async createAdviser(adviserData) {
    return await this.adviserRepository.create(adviserData);
  }

  // Update an existing adviser
  async updateAdviser(id, adviserData) {
    return await this.adviserRepository.update(id, adviserData);
  }

  // Delete an adviser by ID
  async deleteAdviser(id) {
    return await this.adviserRepository.delete(id);
  }

  // Verify the password for an adviser
  async verifyPassword(adviser, plainPassword) {
    return await this.adviserRepository.verifyPassword(adviser, plainPassword);
  }
}

export default AdviserService;
