class Checklist {
    constructor({
      id,
      program_id,
      year_level,
      semester,
      course_code,
      prerequisite_course_code,
      adviser_id,
      start_year,
      end_year,
    }) {
      this.id = id;
      this.program_id = program_id;
      this.year_level = year_level;
      this.semester = semester;
      this.course_code = course_code;
      this.prerequisite_course_code = prerequisite_course_code;
      this.adviser_id = adviser_id;
      this.start_year = start_year;
      this.end_year = end_year;
    }
  
    // Static method to create a Checklist instance from a database row
    static fromDatabase(row) {
      return new Checklist({
        id: row.id,
        program_id: row.program_id,
        year_level: row.year_level,
        semester: row.semester,
        course_code: row.course_code,
        prerequisite_course_code: row.prerequisite_course_code,
        adviser_id: row.adviser_id,
        start_year: row.start_year,
        end_year: row.end_year,
      });
    }
  }
  
  export default Checklist;
  