class Course {
    constructor({
      id,
      course_code,
      course_title,
      credit_unit_lec,
      credit_unit_lab,
    }) {
      this.id = id;
      this.course_code = course_code;
      this.course_title = course_title;
      this.credit_unit_lec = credit_unit_lec;
      this.credit_unit_lab = credit_unit_lab;
    }
  
    // Static method to create a Course instance from a database row
    static fromDatabase(row) {
      return new Course({
        id: row.id,
        course_code: row.course_code,
        course_title: row.course_title,
        credit_unit_lec: row.credit_unit_lec,
        credit_unit_lab: row.credit_unit_lab,
      });
    }
  }
  
  export default Course;
  