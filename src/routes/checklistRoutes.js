// src/routes/checklistRoutes.js
import express from 'express';
import {
  getAllChecklists,
  getChecklistById,
  getChecklistsByProgramId,
  getChecklistsByCourseCode,
  createChecklist,
  updateChecklist,
  deleteChecklist,
} from '../controllers/checklistController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protect all routes below this, requiring authentication
router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Checklists
 *   description: API for managing checklists
 */

/**
 * @swagger
 * /api/checklists:
 *   get:
 *     summary: Get all checklists
 *     tags: [Checklists]
 *     description: >
 *       **Roles Allowed:** `registrar`, `department_head`
 *       Retrieve a list of all checklists.
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar', 'department_head']
 *     responses:
 *       200:
 *         description: A list of checklists
 *       401:
 *         description: Unauthorized
 */
router.get('/', authorize('registrar', 'department_head','adviser'), getAllChecklists);

/**
 * @swagger
 * /api/checklists/{id}:
 *   get:
 *     summary: Get a checklist by ID
 *     tags: [Checklists]
 *     description: >
 *       **Roles Allowed:** `registrar`, `department_head`
 *       Retrieve a specific checklist by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The checklist ID
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar', 'department_head']
 *     responses:
 *       200:
 *         description: A checklist object
 *       404:
 *         description: Checklist not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authorize('registrar', 'department_head', 'adviser'), getChecklistById);

/**
 * @swagger
 * /api/checklists/program/{program_id}:
 *   get:
 *     summary: Get checklists by program ID
 *     tags: [Checklists]
 *     description: >
 *       **Roles Allowed:** `registrar`, `department_head`
 *       Retrieve all checklists for a specific program.
 *     parameters:
 *       - in: path
 *         name: program_id
 *         required: true
 *         description: The program ID
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar', 'department_head']
 *     responses:
 *       200:
 *         description: A list of checklists for the given program
 *       404:
 *         description: No checklists found for the given program
 *       401:
 *         description: Unauthorized
 */
router.get('/program/:program_id', authorize('registrar', 'department_head', 'adviser'), getChecklistsByProgramId);

/**
 * @swagger
 * /api/checklists/course/{course_code}:
 *   get:
 *     summary: Get checklists by course code
 *     tags: [Checklists]
 *     description: >
 *       **Roles Allowed:** `registrar`, `department_head`
 *       Retrieve all checklists for a specific course.
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
 *         description: A list of checklists for the given course
 *       404:
 *         description: No checklists found for the given course
 *       401:
 *         description: Unauthorized
 */
router.get('/course/:course_code', authorize('registrar', 'department_head', 'adviser'), getChecklistsByCourseCode);

/**
 * @swagger
 * /api/checklists:
 *   post:
 *     summary: Create a new checklist
 *     tags: [Checklists]
 *     description: >
 *       **Roles Allowed:** `registrar`
 *       Add a new checklist to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               program_id:
 *                 type: string
 *               year_level:
 *                 type: integer
 *               semester:
 *                 type: integer
 *               course_code:
 *                 type: string
 *               adviser_id:
 *                 type: string
 *               start_year:
 *                 type: integer
 *               end_year:
 *                 type: integer
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar']
 *     responses:
 *       201:
 *         description: Successfully created checklist
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/', authorize('registrar', 'adviser'), createChecklist);

/**
 * @swagger
 * /api/checklists/{id}:
 *   put:
 *     summary: Update a checklist by ID
 *     tags: [Checklists]
 *     description: >
 *       **Roles Allowed:** `registrar`
 *       Update details of a specific checklist.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The checklist ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               program_id:
 *                 type: string
 *               year_level:
 *                 type: integer
 *               semester:
 *                 type: integer
 *               course_code:
 *                 type: string
 *               adviser_id:
 *                 type: string
 *               start_year:
 *                 type: integer
 *               end_year:
 *                 type: integer
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar']
 *     responses:
 *       200:
 *         description: Successfully updated checklist
 *       400:
 *         description: Bad request
 *       404:
 *         description: Checklist not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authorize('registrar', 'adviser'), updateChecklist);

/**
 * @swagger
 * /api/checklists/{id}:
 *   delete:
 *     summary: Delete a checklist by ID
 *     tags: [Checklists]
 *     description: >
 *       **Roles Allowed:** `registrar`
 *       Remove a checklist from the system.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The checklist ID
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar']
 *     responses:
 *       200:
 *         description: Successfully deleted checklist
 *       404:
 *         description: Checklist not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authorize('registrar', 'adviser'), deleteChecklist);

export default router;
