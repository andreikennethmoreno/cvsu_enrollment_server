// src/services/preEnrollmentService.js
import { PreEnrollmentRepository } from '../repositories/preEnrollmentRepository.js';

export class PreEnrollmentService {
  constructor() {
    this.preEnrollmentRepository = new PreEnrollmentRepository();
  }

  // Get all pre-enrollments
  async getAllPreEnrollments() {
    return await this.preEnrollmentRepository.getAll();
  }

  // Get a pre-enrollment by ID
  async getPreEnrollmentById(id) {
    return await this.preEnrollmentRepository.getById(id);
  }

  // Create a new pre-enrollment
  async createPreEnrollment(preEnrollmentData) {
    return await this.preEnrollmentRepository.create(preEnrollmentData);
  }

  // Update an existing pre-enrollment
  async updatePreEnrollment(id, preEnrollmentData) {
    return await this.preEnrollmentRepository.update(id, preEnrollmentData);
  }

  // Delete a pre-enrollment by ID
  async deletePreEnrollment(id) {
    return await this.preEnrollmentRepository.delete(id);
  }
}

export default PreEnrollmentService;
