// src/routes/coursePrerequisiteRoutes.js
import express from 'express';
import {
  getAllCoursePrerequisites,
  getCoursePrerequisiteById,
  getCoursePrerequisitesByCourseCode,
  createCoursePrerequisite,
  updateCoursePrerequisite,
  deleteCoursePrerequisite,
} from '../controllers/coursePrerequisiteController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protect all routes below this, requiring authentication
router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Course Prerequisites
 *   description: API for managing course prerequisites
 */

/**
 * @swagger
 * /api/course-prerequisites:
 *   get:
 *     summary: Get all course prerequisites
 *     tags: [Course Prerequisites]
 *     description: >
 *       **Roles Allowed:** `registrar`, `department_head`
 *       Retrieve a list of all course prerequisites.
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar', 'department_head']
 *     responses:
 *       200:
 *         description: A list of course prerequisites
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
 *                       course_code:
 *                         type: string
 *                       prerequisite_course_code:
 *                         type: string
 *                 example:
 *                   status: 200
 *                   data:
 *                     - course_code: "CS102"
 *                       prerequisite_course_code: "CS101"
 *       401:
 *         description: Unauthorized
 */
router.get('/', authorize('registrar', 'department_head'), getAllCoursePrerequisites);

/**
 * @swagger
 * /api/course-prerequisites/{id}:
 *   get:
 *     summary: Get a course prerequisite by ID
 *     tags: [Course Prerequisites]
 *     description: >
 *       **Roles Allowed:** `registrar`, `department_head`
 *       Retrieve a specific course prerequisite by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The course prerequisite ID
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar', 'department_head']
 *     responses:
 *       200:
 *         description: A course prerequisite object
 *       404:
 *         description: Course prerequisite not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authorize('registrar', 'department_head'), getCoursePrerequisiteById);

/**
 * @swagger
 * /api/course-prerequisites/{course_code}:
 *   get:
 *     summary: Get course prerequisites by course code
 *     tags: [Course Prerequisites]
 *     description: >
 *       **Roles Allowed:** `registrar`, `department_head`
 *       Retrieve all prerequisites for a specific course by its course code.
 *     parameters:
 *       - in: path
 *         name: course_code
 *         required: true
 *         description: The course code
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar', 'department_head']
 *     responses:
 *       200:
 *         description: A list of prerequisites for the given course
 *       404:
 *         description: No prerequisites found for the given course
 *       401:
 *         description: Unauthorized
 */
router.get('/course-code/:course_code', authorize('registrar', 'department_head'), getCoursePrerequisitesByCourseCode);

/**
 * @swagger
 * /api/course-prerequisites:
 *   post:
 *     summary: Create a new course prerequisite
 *     tags: [Course Prerequisites]
 *     description: >
 *       **Roles Allowed:** `registrar`
 *       Add a new prerequisite for a course.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               course_code:
 *                 type: string
 *               prerequisite_course_code:
 *                 type: string
 *             example:
 *               course_code: "CS102"
 *               prerequisite_course_code: "CS101"
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar']
 *     responses:
 *       201:
 *         description: Successfully created course prerequisite
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/', authorize('registrar'), createCoursePrerequisite);

/**
 * @swagger
 * /api/course-prerequisites/{id}:
 *   put:
 *     summary: Update a course prerequisite by ID
 *     tags: [Course Prerequisites]
 *     description: >
 *       **Roles Allowed:** `registrar`, `department_head`
 *       Update details of a specific course prerequisite.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The course prerequisite ID
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
 *               prerequisite_course_code:
 *                 type: string
 *             example:
 *               course_code: "CS103"
 *               prerequisite_course_code: "CS101"
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar', 'department_head']
 *     responses:
 *       200:
 *         description: Successfully updated course prerequisite
 *       400:
 *         description: Bad request
 *       404:
 *         description: Course prerequisite not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authorize('registrar'), updateCoursePrerequisite);

/**
 * @swagger
 * /api/course-prerequisites/{id}:
 *   delete:
 *     summary: Delete a course prerequisite by ID
 *     tags: [Course Prerequisites]
 *     description: >
 *       **Roles Allowed:** `registrar`
 *       Remove a course prerequisite from the system.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The course prerequisite ID
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar']
 *     responses:
 *       200:
 *         description: Successfully deleted course prerequisite
 *       404:
 *         description: Course prerequisite not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authorize('registrar'), deleteCoursePrerequisite);

export default router;
