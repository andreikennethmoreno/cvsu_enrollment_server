// src/repositories/advisingRepository.js
import { BaseRepository } from './baseRepository.js';
import Advising from '../models/advisingModel.js';

export class AdvisingRepository extends BaseRepository {
  constructor() {
    super('advisings', Advising);
  }

  // Override the create method to include student_id, student_course_checklist, and adviser_id
  async create(advisingData) {
    const { student_id, student_course_checklist, adviser_id } = advisingData;

    console.log('advisingData', advisingData);

    return super.create({
      student_id,
      student_course_checklist,
      adviser_id,
    });
  }

  // Override the update method to update advising details
  async update(id, advisingData) {
    const { student_id, student_course_checklist, adviser_id } = advisingData;

    const dataToUpdate = {
      student_id,
      student_course_checklist,
      adviser_id,
    };

    return super.update(id, dataToUpdate);
  }

  // Retrieve all advisings
  async getAll() {
    return super.getAll();
  }

  // Retrieve an advising by ID
  async getById(id) {
    return super.getById(id);
  }

  // Delete an advising by ID
  async delete(id) {
    return super.delete(id);
  }
}

export default AdvisingRepository;
