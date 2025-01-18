// src/routes/courseRoutes.js
import express from 'express';
import {
  getAllCourses,
  getCourseById,
  getCourseByCode,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/courseController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protect all routes below this, requiring authentication
router.use(protect); 

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: API for managing courses
 */

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     description: >
 *       **Roles Allowed:** `registrar`, `department_head`  
 *       Retrieve a list of all courses.
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar', 'department_head']
 *     responses:
 *       200:
 *         description: A list of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       course_code:
 *                         type: string
 *                       course_title:
 *                         type: string
 *                       credit_unit_lec:
 *                         type: integer
 *                       credit_unit_lab:
 *                         type: integer
 *                 example:
 *                   status: 200
 *                   data:
 *                     - id: 1
 *                       course_code: "CS101"
 *                       course_title: "Computer Science 101"
 *                       credit_unit_lec: 3
 *                       credit_unit_lab: 2
 *       401:
 *         description: Unauthorized
 */
router.get('/', authorize('registrar', 'department_head'), getAllCourses);

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get a course by ID
 *     tags: [Courses]
 *     description: >
 *       **Roles Allowed:** `registrar`, `department_head`  
 *       Retrieve a specific course by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The course ID
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar', 'department_head']
 *     responses:
 *       200:
 *         description: A course object
 *       404:
 *         description: Course not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authorize('registrar', 'department_head'), getCourseById);

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     description: >
 *       **Roles Allowed:** `registrar`  
 *       Add a new course to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               course_code:
 *                 type: string
 *               course_title:
 *                 type: string
 *               credit_unit_lec:
 *                 type: integer
 *               credit_unit_lab:
 *                 type: integer
 *             example:
 *               course_code: "CS101"
 *               course_title: "Computer Science 101"
 *               credit_unit_lec: 3
 *               credit_unit_lab: 2
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar']
 *     responses:
 *       201:
 *         description: Successfully created course
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/', authorize('registrar'), createCourse);

/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     summary: Update a course by ID
 *     tags: [Courses]
 *     description: >
 *       **Roles Allowed:** `registrar`, `department_head`  
 *       Update details of a specific course.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The course ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               course_code:
 *                 type: string
 *               course_title:
 *                 type: string
 *               credit_unit_lec:
 *                 type: integer
 *               credit_unit_lab:
 *                 type: integer
 *             example:
 *               course_code: "CS101"
 *               course_title: "Computer Science 102"
 *               credit_unit_lec: 3
 *               credit_unit_lab: 2
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar', 'department_head']
 *     responses:
 *       200:
 *         description: Successfully updated course
 *       400:
 *         description: Bad request
 *       404:
 *         description: Course not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authorize('registrar'), updateCourse);

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Delete a course by ID
 *     tags: [Courses]
 *     description: >
 *       **Roles Allowed:** `registrar`  
 *       Remove a course from the system.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The course ID
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar']
 *     responses:
 *       200:
 *         description: Successfully deleted course
 *       404:
 *         description: Course not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authorize('registrar',), deleteCourse);

export default router;
