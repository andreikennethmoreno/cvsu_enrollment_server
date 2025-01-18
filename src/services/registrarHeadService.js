import { RegistrarHeadRepository } from '../repositories/registrarHeadRepository.js';

export class RegistrarHeadService {
  constructor() {
    this.registrarHeadRepository = new RegistrarHeadRepository();
  }

  // Get all registrar heads
  async getAllRegistrarHeads() {
    return await this.registrarHeadRepository.getAll(); // Using the base repository method
  }

  // Get a registrar head by ID
  async getRegistrarHeadById(id) {
    return await this.registrarHeadRepository.getById(id); // Using the base repository method
  }

  // Create a new registrar head
  async createRegistrarHead(registrarHeadData) {
    return await this.registrarHeadRepository.create(registrarHeadData); // Using the base repository method
  }

  // Update an existing registrar head
  async updateRegistrarHead(id, registrarHeadData) {
    return await this.registrarHeadRepository.update(id, registrarHeadData); // Using the base repository method
  }

  // Delete a registrar head by ID
  async deleteRegistrarHead(id) {
    return await this.registrarHeadRepository.delete(id); // Using the base repository method
  }
}

export default RegistrarHeadService;
