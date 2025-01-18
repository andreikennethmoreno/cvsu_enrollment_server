class Adviser {
    constructor({
      id,
      first_name,
      middle_name,
      last_name,
      email,
      contact_number,
      password,
      program_id, // Foreign key referencing programs
    }) {
      this.id = id;
      this.first_name = first_name;
      this.middle_name = middle_name;
      this.last_name = last_name;
      this.email = email;
      this.contact_number = contact_number;
      this.password = password;
      this.program_id = program_id; // Assign program_id
    }
  
    // Static method to create an Adviser instance from a database row
    static fromDatabase(row) {
      return new Adviser({
        id: row.id,
        first_name: row.first_name,
        middle_name: row.middle_name,
        last_name: row.last_name,
        email: row.email,
        contact_number: row.contact_number,
        password: row.password,
        program_id: row.program_id, // Map program_id from database row
      });
    }
  }
  
  export default Adviser;
  