import { ProgramRepository } from '../repositories/programRepository.js';

export class ProgramService {
  constructor() {
    this.programRepository = new ProgramRepository();
  }

  // Get all programs
  async getAllPrograms() {
    return await this.programRepository.getAll(); // Using the base repository method
  }

  // Get a program by ID
  async getProgramById(id) {
    return await this.programRepository.getById(id); // Using the base repository method
  }

  // Create a new program
  async createProgram(programData) {
    return await this.programRepository.create(programData); // Using the base repository method
  }

  // Update an existing program
  async updateProgram(id, programData) {
    return await this.programRepository.update(id, programData); // Using the base repository method
  }

  // Delete a program by ID
  async deleteProgram(id) {
    return await this.programRepository.delete(id); // Using the base repository method
  }
}

export default ProgramService;
