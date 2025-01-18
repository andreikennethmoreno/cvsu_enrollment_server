// src/repositories/baseRepository.js
import { query } from '../config/dbConfig.js';

export class BaseRepository {
  constructor(tableName, model) {
    this.tableName = tableName;
    this.model = model;
  }

  // Generic create method
  async create(data) {
    const columns = Object.keys(data).join(', ');
    const values = Object.values(data);
    const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');

    const result = await query(
      `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders}) RETURNING *`,
      values
    );

    return this.model.fromDatabase(result.rows[0]);
  }

  // Generic update method
  async update(id, data) {
    const setClause = Object.keys(data)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');

    const values = Object.values(data);
    values.push(id);

    const result = await query(
      `UPDATE ${this.tableName} SET ${setClause} WHERE id = $${values.length} RETURNING *`,
      values
    );

    return this.model.fromDatabase(result.rows[0]);
  }

  // Generic delete method
  async delete(id) {
    const result = await query(`DELETE FROM ${this.tableName} WHERE id = $1 RETURNING *`, [id]);
    return this.model.fromDatabase(result.rows[0]);
  }

  // Generic getById method
  async getById(id) {
    const result = await query(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id]);
    if (result.rows.length === 0) return null;
    return this.model.fromDatabase(result.rows[0]);
  }

  // Generic getAll method
  async getAll() {
    const result = await query(`SELECT * FROM ${this.tableName}`);
    console.log('All data from table:', result.rows); // Remove this log in production
    return result.rows.map(row => this.model.fromDatabase(row));
  }

  // Generic getByEmail method
  async getByEmail(email) {
    const result = await query(`SELECT * FROM ${this.tableName} WHERE email = $1`, [email]);
    if (result.rows.length === 0) return null;
    return this.model.fromDatabase(result.rows[0]);
  }

  // Method to generate email based on first name, middle name, and last name
  generateEmail(firstName, middleName, lastName) {
    // Remove spaces and convert to lowercase
    const formattedFirstName = firstName.trim().toLowerCase();
    const formattedMiddleName = middleName.trim().toLowerCase();
    const formattedLastName = lastName.trim().toLowerCase();

    // Combine to form the email
    const email = `${formattedFirstName}${formattedMiddleName ? formattedMiddleName : ''}.${formattedLastName}@cvsu.edu.ph`;
    return email;
  }
}

export default BaseRepository;
