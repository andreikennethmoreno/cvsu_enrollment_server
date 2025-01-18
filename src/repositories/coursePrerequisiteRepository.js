// src/repositories/coursePrerequisiteRepository.js
import { BaseRepository } from './baseRepository.js';
import CoursePrerequisite from '../models/coursePrerequisiteModel.js';

export class CoursePrerequisiteRepository extends BaseRepository {
  constructor() {
    super('course_prerequisites', CoursePrerequisite);
  }

  // Create a new course prerequisite entry
  async create(coursePrerequisiteData) {
    const { course_code, prerequisite_course_code } = coursePrerequisiteData;

    return super.create({
      course_code,
      prerequisite_course_code,
    });
  }

  // Update an existing course prerequisite entry
  async update(id, coursePrerequisiteData) {
    const { course_code, prerequisite_course_code } = coursePrerequisiteData;

    const dataToUpdate = {
      course_code,
      prerequisite_course_code,
    };

    return super.update(id, dataToUpdate);
  }

  // Retrieve all course prerequisites
  async getAll() {
    return super.getAll();
  }

  // Retrieve a course prerequisite by ID
  async getById(id) {
    return super.getById(id);
  }

  // Delete a course prerequisite by ID
  async delete(id) {
    return super.delete(id);
  }

  // Retrieve prerequisites by course code
  async getByCourseCode(course_code) {
    return super.getOne({ course_code });
  }
}

export default CoursePrerequisiteRepository;
