// src/routes/advisingRoutes.js
import express from 'express';
import {
  getAllAdvisings,
  getAdvisingById,
  createAdvising,
  updateAdvising,
  deleteAdvising,
} from '../controllers/advisingController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protect all routes below this
router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Advisings
 *   description: API for managing advisings
 */

/**
 * @swagger
 * /api/advisings:
 *   get:
 *     summary: Get all advisings
 *     tags: [Advisings]
 *     description: >
 *       **Roles Allowed:** `registrar`  
 *       Retrieve a list of all advisings.
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar']
 *     responses:
 *       200:
 *         description: A list of advisings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   student_id:
 *                     type: integer
 *                   student_course_checklist:
 *                     type: string
 *                   adviser_id:
 *                     type: integer
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *                 example:
 *                   id: 1
 *                   student_id: 101
 *                   student_course_checklist: "CS Checklist"
 *                   adviser_id: 5
 *                   created_at: "2025-01-01T12:00:00Z"
 *                   updated_at: "2025-01-05T12:00:00Z"
 *       401:
 *         description: Unauthorized
 */
router.get('/', authorize('registrar', 'adviser'), getAllAdvisings);

/**
 * @swagger
 * /api/advisings/{id}:
 *   get:
 *     summary: Get an advising by ID
 *     tags: [Advisings]
 *     description: >
 *       **Roles Allowed:** `registrar`, `adviser`  
 *       Retrieve a specific advising record by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The advising ID
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar', 'adviser']
 *     responses:
 *       200:
 *         description: Advising details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 student_id:
 *                   type: integer
 *                 student_course_checklist:
 *                   type: string
 *                 adviser_id:
 *                   type: integer
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                 example:
 *                   id: 1
 *                   student_id: 101
 *                   student_course_checklist: "CS Checklist"
 *                   adviser_id: 5
 *                   created_at: "2025-01-01T12:00:00Z"
 *                   updated_at: "2025-01-05T12:00:00Z"
 *       404:
 *         description: Advising not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authorize('registrar', 'adviser'), getAdvisingById);

/**
 * @swagger
 * /api/advisings:
 *   post:
 *     summary: Create a new advising
 *     tags: [Advisings]
 *     description: >
 *       **Roles Allowed:** `registrar`  
 *       Add a new advising record to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: integer
 *               student_course_checklist:
 *                 type: string
 *               adviser_id:
 *                 type: integer
 *             example:
 *               student_id: 101
 *               student_course_checklist: "CS Checklist"
 *               adviser_id: 5
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar']
 *     responses:
 *       201:
 *         description: Advising created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/', authorize('registrar', 'adviser'), createAdvising);

/**
 * @swagger
 * /api/advisings/{id}:
 *   put:
 *     summary: Update an advising by ID
 *     tags: [Advisings]
 *     description: >
 *       **Roles Allowed:** `registrar`, `adviser`  
 *       Update the details of a specific advising record.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The advising ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: integer
 *               student_course_checklist:
 *                 type: string
 *               adviser_id:
 *                 type: integer
 *             example:
 *               student_id: 101
 *               student_course_checklist: "CS Checklist Updated"
 *               adviser_id: 6
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar', 'adviser']
 *     responses:
 *       200:
 *         description: Advising updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Advising not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authorize('registrar', 'adviser'), updateAdvising);

/**
 * @swagger
 * /api/advisings/{id}:
 *   delete:
 *     summary: Delete an advising by ID
 *     tags: [Advisings]
 *     description: >
 *       **Roles Allowed:** `registrar`  
 *       Remove an advising record from the system.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The advising ID
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar']
 *     responses:
 *       200:
 *         description: Advising deleted successfully
 *       404:
 *         description: Advising not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authorize('registrar', 'adviser'), deleteAdvising);

export default router;
