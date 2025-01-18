// src/repositories/checklistRepository.js
import { BaseRepository } from './baseRepository.js';
import Checklist from '../models/checklistModel.js';

export class ChecklistRepository extends BaseRepository {
  constructor() {
    super('checklists', Checklist);
  }

  // Create a new checklist entry
  async create(checklistData) {
    const {
      program_id,
      year_level,
      semester,
      course_code,
      prerequisite_course_code,
      adviser_id,
      start_year,
      end_year,
    } = checklistData;

    return super.create({
      program_id,
      year_level,
      semester,
      course_code,
      prerequisite_course_code,
      adviser_id,
      start_year,
      end_year,
    });
  }

  // Update an existing checklist entry
  async update(id, checklistData) {
    const {
      program_id,
      year_level,
      semester,
      course_code,
      prerequisite_course_code,
      adviser_id,
      start_year,
      end_year,
    } = checklistData;

    const dataToUpdate = {
      program_id,
      year_level,
      semester,
      course_code,
      prerequisite_course_code,
      adviser_id,
      start_year,
      end_year,
    };

    return super.update(id, dataToUpdate);
  }

  // Retrieve all checklists
  async getAll() {
    return super.getAll();
  }

  // Retrieve a checklist by ID
  async getById(id) {
    return super.getById(id);
  }

  // Delete a checklist by ID
  async delete(id) {
    return super.delete(id);
  }

  // Retrieve checklists by program ID
  async getByProgramId(program_id) {
    return super.getOne({ program_id });
  }

  // Retrieve checklists by course code
  async getByCourseCode(course_code) {
    return super.getOne({ course_code });
  }
}

export default ChecklistRepository;
