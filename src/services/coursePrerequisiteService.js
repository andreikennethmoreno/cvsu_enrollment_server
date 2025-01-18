// src/services/coursePrerequisiteService.js
import { CoursePrerequisiteRepository } from '../repositories/coursePrerequisiteRepository.js';

export class CoursePrerequisiteService {
  constructor() {
    this.coursePrerequisiteRepository = new CoursePrerequisiteRepository();
  }

  // Get all course prerequisites
  async getAllCoursePrerequisites() {
    return await this.coursePrerequisiteRepository.getAll();
  }

  // Get a course prerequisite by ID
  async getCoursePrerequisiteById(id) {
    return await this.coursePrerequisiteRepository.getById(id);
  }

  // Create a new course prerequisite
  async createCoursePrerequisite(coursePrerequisiteData) {
    return await this.coursePrerequisiteRepository.create(coursePrerequisiteData);
  }

  // Update an existing course prerequisite
  async updateCoursePrerequisite(id, coursePrerequisiteData) {
    return await this.coursePrerequisiteRepository.update(id, coursePrerequisiteData);
  }

  // Delete a course prerequisite by ID
  async deleteCoursePrerequisite(id) {
    return await this.coursePrerequisiteRepository.delete(id);
  }

  // Get course prerequisites by course code
  async getCoursePrerequisitesByCourseCode(course_code) {
    return await this.coursePrerequisiteRepository.getByCourseCode(course_code);
  }
}

export default CoursePrerequisiteService;
