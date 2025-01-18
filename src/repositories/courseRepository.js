// src/repositories/courseRepository.js
import { BaseRepository } from './baseRepository.js';
import Course from '../models/courseModel.js';

export class CourseRepository extends BaseRepository {
  constructor() {
    super('courses', Course);
  }

  // Override the create method to include course_code, course_title, and credit units
  async create(courseData) {
    const { course_code, course_title, credit_unit_lec, credit_unit_lab } = courseData;

    return super.create({
      course_code,
      course_title,
      credit_unit_lec,
      credit_unit_lab,
    });
  }

  // Override the update method to update course details
  async update(id, courseData) {
    const { course_code, course_title, credit_unit_lec, credit_unit_lab } = courseData;

    const dataToUpdate = {
      course_code,
      course_title,
      credit_unit_lec,
      credit_unit_lab,
    };

    return super.update(id, dataToUpdate);
  }

  // Retrieve all courses
  async getAll() {
    return super.getAll();
  }

  // Retrieve a course by ID
  async getById(id) {
    return super.getById(id);
  }

  // Delete a course by ID
  async delete(id) {
    return super.delete(id);
  }
}

export default CourseRepository;
