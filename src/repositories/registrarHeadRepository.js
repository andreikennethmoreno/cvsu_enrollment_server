// src/repositories/registrarHeadRepository.js
import { BaseRepository } from './baseRepository.js';
import bcrypt from 'bcrypt';
import RegistrarHead from '../models/registrarHeadModel.js';

export class RegistrarHeadRepository extends BaseRepository {
  constructor() {
    super('registrar_heads', RegistrarHead);
  }

  // Hash the password
  async hashPassword(password) {
    return await bcrypt.hash(password, 10); // 10 is the salt rounds
  }

  // Method to generate email (if needed)
  generateEmail(first_name, middle_name, last_name) {
    // Generate a simple email format using the names (this is just an example)
    return `${first_name.toLowerCase()}.${middle_name.toLowerCase()}.${last_name.toLowerCase()}@school.com`;
  }

  // Override the create method to hash the password and generate an email
  async create(registrarHeadData) {
    const { first_name, middle_name, last_name, email, password } = registrarHeadData;

    // Generate email if not provided
    const generatedEmail = email || this.generateEmail(first_name, middle_name, last_name);

    const hashedPassword = await this.hashPassword(password);

    return super.create({
      first_name,
      middle_name,
      last_name,
      email: generatedEmail, // Use generated email if not provided
      password: hashedPassword,
    });
  }

  // Override the update method to hash the password if it's provided and generate an email if necessary
  async update(id, registrarHeadData) {
    const { first_name, middle_name, last_name, email, password } = registrarHeadData;

    // Generate email if not provided
    const generatedEmail = email || this.generateEmail(first_name, middle_name, last_name);

    // Hash the password if provided
    const hashedPassword = password ? await this.hashPassword(password) : undefined;

    const dataToUpdate = {
      first_name,
      middle_name,
      last_name,
      email: generatedEmail, // Use generated email if original is not provided
      ...(hashedPassword && { password: hashedPassword }), // Update password only if provided
    };

    return super.update(id, dataToUpdate);
  }

  // Custom method to verify the password
  async verifyPassword(registrarHead, plainPassword) {
    return await bcrypt.compare(plainPassword, registrarHead.password);
  }
}

export default RegistrarHeadRepository;
