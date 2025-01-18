class Student {
  constructor({
    id,
    first_name,
    middle_name,
    last_name,
    email,
    contact_number,
    address,
    date_of_birth,
    student_type,
    standing_year,
    semester,
    password,
    program_id, // Added program_id
  }) {
    this.id = id;
    this.first_name = first_name;
    this.middle_name = middle_name;
    this.last_name = last_name;
    this.email = email;
    this.contact_number = contact_number;
    this.address = address;
    this.date_of_birth = date_of_birth;
    this.student_type = student_type;
    this.standing_year = standing_year;
    this.semester = semester;
    this.password = password;
    this.program_id = program_id; // Assign program_id
  }

  // Static method to create a Student instance from a database row
  static fromDatabase(row) {
    return new Student({
      id: row.id,
      first_name: row.first_name,
      middle_name: row.middle_name,
      last_name: row.last_name,
      email: row.email,
      contact_number: row.contact_number,
      address: row.address,
      date_of_birth: row.date_of_birth,
      student_type: row.student_type,
      standing_year: row.standing_year,
      semester: row.semester,
      password: row.password,
      program_id: row.program_id, // Map program_id from database row
    });
  }
}

export default Student;
