class DepartmentHead {
  constructor({
    id,
    first_name,
    middle_name,
    last_name,
    email,
    password,
    program_id, // Add program_id
  }) {
    this.id = id;
    this.first_name = first_name;
    this.middle_name = middle_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
    this.program_id = program_id; // Initialize program_id
  }

  // Static method to create a DepartmentHead instance from a database row
  static fromDatabase(row) {
    return new DepartmentHead({
      id: row.id,
      first_name: row.first_name,
      middle_name: row.middle_name,
      last_name: row.last_name,
      email: row.email,
      password: row.password,
      program_id: row.program_id, // Map program_id from the database row
    });
  }
}

export default DepartmentHead;
