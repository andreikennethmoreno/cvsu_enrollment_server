// models/programModels.js
class Program {
    constructor({
      id,
      program_name,
      
    }) {
      this.id = id;
      this.program_name = program_name;
    }
  
    // Static method to create a Program instance from a database row
    static fromDatabase(row) {
      return new Program({
        id: row.id,
        program_name: row.program_name,
      });
    }
  
  }
  
  export default Program;
  