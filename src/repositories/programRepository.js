import { BaseRepository } from './baseRepository.js';
import Program from '../models/programModel.js';

export class ProgramRepository extends BaseRepository {
  constructor() {
    super('programs', Program);
  }

  // Create a new program
  async create(programData) {
    const { program_name } = programData;
    return super.create({ program_name });
  }

  // Update an existing program
  async update(id, programData) {
    const { program_name } = programData;
    return super.update(id, { program_name });
  }

  // Retrieve all programs
  async getAll() {
    return super.getAll();
  }

  // Retrieve a program by its ID
  async getById(id) {
    return super.getById(id);
  }

  // Delete a program by ID
  async delete(id) {
    return super.delete(id);
  }
}

export default ProgramRepository;
