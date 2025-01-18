class Advising {
    constructor({
      id,
      student_id,
      student_course_checklist,
      adviser_id,
    }) {
      this.id = id;
      this.student_id = student_id; // Foreign key referencing students
      this.student_course_checklist = student_course_checklist; // Foreign key referencing checklists
      this.adviser_id = adviser_id; // Foreign key referencing advisers
    }
  
    // Static method to create an Advising instance from a database row
    static fromDatabase(row) {
      return new Advising({
        id: row.id,
        student_id: row.student_id,
        student_course_checklist: row.student_course_checklist,
        adviser_id: row.adviser_id,
      });
    }
  }
  
  export default Advising;
  