import { BaseRepository } from './baseRepository.js';
import bcrypt from 'bcrypt';
import Adviser from '../models/adviserModel.js';

export class AdviserRepository extends BaseRepository {
  constructor() {
    super('advisers', Adviser);
  }

  // Hash the password
  async hashPassword(password) {
    return await bcrypt.hash(password, 10); // 10 is the salt rounds
  }

  // Override the create method to hash the password and generate an email
  async create(adviserData) {
    const { first_name, middle_name, last_name, email, password, program_id, contact_number } = adviserData;

    // Generate email if not provided
    const generatedEmail = email || this.generateEmail(first_name, middle_name, last_name);

    const hashedPassword = await this.hashPassword(password);

    return super.create({
      first_name,
      middle_name,
      last_name,
      email: generatedEmail, // Use generated email if not provided
      password: hashedPassword,
      contact_number, // Include contact_number
      program_id, // Include program_id in creation
    });
  }

  // Override the update method to hash the password if it's provided and update program_id
  async update(id, adviserData) {
    const { first_name, middle_name, last_name, email, password, program_id, contact_number } = adviserData;

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
      contact_number, // Include contact_number
      ...(program_id && { program_id }), // Update program_id if provided
    };

    return super.update(id, dataToUpdate);
  }

  // Retrieve all advisers
  async getAll() {
    return super.getAll();
  }

  // Retrieve an adviser by ID
  async getById(id) {
    return super.getById(id);
  }

  // Delete an adviser by ID
  async delete(id) {
    return super.delete(id);
  }

  // Custom method to verify the password
  async verifyPassword(adviser, plainPassword) {
    return await bcrypt.compare(plainPassword, adviser.password);
  }
}

export default AdviserRepository;
