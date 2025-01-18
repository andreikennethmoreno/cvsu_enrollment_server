// models/registrarHeadModel.js

class RegistrarHead {
  constructor({
    id,
    first_name,
    middle_name,
    last_name,
    email,
    password,
  }) {
    this.id = id;
    this.first_name = first_name;
    this.middle_name = middle_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
  }

  // Static method to create a RegistrarHead instance from a database row
  static fromDatabase(row) {
    return new RegistrarHead({
      id: row.id,
      first_name: row.first_name,
      middle_name: row.middle_name,
      last_name: row.last_name,
      email: row.email,
      password: row.password,
    });
  }

}

export default RegistrarHead;
