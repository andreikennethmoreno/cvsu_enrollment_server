// src/services/courseService.js
import { CourseRepository } from '../repositories/courseRepository.js';

export class CourseService {
  constructor() {
    this.courseRepository = new CourseRepository();
  }

  // Get all courses
  async getAllCourses() {
    return await this.courseRepository.getAll();
  }

  // Get a course by ID
  async getCourseById(id) {
    return await this.courseRepository.getById(id);
  }

  // Create a new course
  async createCourse(courseData) {
    return await this.courseRepository.create(courseData);
  }

  // Update an existing course
  async updateCourse(id, courseData) {
    return await this.courseRepository.update(id, courseData);
  }

  // Delete a course by ID
  async deleteCourse(id) {
    return await this.courseRepository.delete(id);
  }

  // Get a course by course code
  async getCourseByCode(course_code) {
    return await this.courseRepository.getByCourseCode(course_code);
  }
}

export default CourseService;
