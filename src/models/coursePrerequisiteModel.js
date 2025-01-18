class CoursePrerequisite {
    constructor({
      id,
      course_code,
      prerequisite_course_code,
    }) {
      this.id = id;
      this.course_code = course_code;
      this.prerequisite_course_code = prerequisite_course_code;
    }
  
    // Static method to create a CoursePrerequisite instance from a database row
    static fromDatabase(row) {
      return new CoursePrerequisite({
        id: row.id,
        course_code: row.course_code,
        prerequisite_course_code: row.prerequisite_course_code,
      });
    }
  }
  
  export default CoursePrerequisite;
  