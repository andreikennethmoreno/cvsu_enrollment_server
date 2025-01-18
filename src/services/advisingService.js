// src/services/advisingService.js

import { AdvisingRepository } from '../repositories/advisingRepository.js';


export class AdvisingService {
  constructor() {
    this.advisingRepository = new AdvisingRepository();
  }

  // Get all advisings
  async getAllAdvisings() {
    return await this.advisingRepository.getAll();
  }

  // Get an advising by ID
  async getAdvisingById(id) {
    return await this.advisingRepository.getById(id);
  }

  // Create a new advising
  async createAdvising(advisingData) {
    return await this.advisingRepository.create(advisingData);
  }

  // Update an existing advising
  async updateAdvising(id, advisingData) {
    return await this.advisingRepository.update(id, advisingData);
  }

  // Delete an advising by ID
  async deleteAdvising(id) {
    return await this.advisingRepository.delete(id);
  }


}

export default AdvisingService;
