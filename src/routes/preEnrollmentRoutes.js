import express from 'express';
import {
  getAllPreEnrollments,
  getPreEnrollmentById,
  createPreEnrollment,
  updatePreEnrollment,
  deletePreEnrollment,
} from '../controllers/preEnrollmentController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: PreEnrollments
 *   description: API for managing pre-enrollments
 */

/**
 * @swagger
 * /api/preenrollments:
 *   get:
 *     summary: Get all pre-enrollments
 *     tags: [PreEnrollments]
 *     description: >
 *       **Roles Allowed:** `registrar`, `department_head`
 *       Retrieve all pre-enrollment records.
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar', 'department_head']
 *     responses:
 *       200:
 *         description: A list of pre-enrollment records
 *       401:
 *         description: Unauthorized
 */
router.get('/', authorize('registrar', 'department_head'), getAllPreEnrollments);

/**
 * @swagger
 * /api/preenrollments/{id}:
 *   get:
 *     summary: Get a pre-enrollment by ID
 *     tags: [PreEnrollments]
 *     description: >
 *       **Roles Allowed:** `registrar`, `department_head`
 *       Retrieve a specific pre-enrollment record by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar', 'department_head']
 *     responses:
 *       200:
 *         description: A pre-enrollment object
 *       404:
 *         description: Pre-enrollment not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authorize('registrar', 'department_head'), getPreEnrollmentById);

/**
 * @swagger
 * /api/preenrollments:
 *   post:
 *     summary: Create a new pre-enrollment
 *     tags: [PreEnrollments]
 *     description: >
 *       **Roles Allowed:** `registrar`
 *       Add a new pre-enrollment record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: integer
 *               section_id:
 *                 type: integer
 *               status:
 *                 type: string
 *             example:
 *               student_id: 1
 *               section_id: 2
 *               status: "pending"
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar']
 *     responses:
 *       201:
 *         description: Successfully created pre-enrollment
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/', createPreEnrollment);

/**
 * @swagger
 * /api/preenrollments/{id}:
 *   put:
 *     summary: Update a pre-enrollment by ID
 *     tags: [PreEnrollments]
 *     description: >
 *       **Roles Allowed:** `registrar`, `department_head`
 *       Update an existing pre-enrollment record by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
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
 *               section_id:
 *                 type: integer
 *               status:
 *                 type: string
 *             example:
 *               student_id: 1
 *               section_id: 2
 *               status: "approved"
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar', 'department_head']
 *     responses:
 *       200:
 *         description: Successfully updated pre-enrollment
 *       400:
 *         description: Bad request
 *       404:
 *         description: Pre-enrollment not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authorize('registrar', 'department_head'), updatePreEnrollment);

/**
 * @swagger
 * /api/preenrollments/{id}:
 *   delete:
 *     summary: Delete a pre-enrollment by ID
 *     tags: [PreEnrollments]
 *     description: >
 *       **Roles Allowed:** `registrar`
 *       Remove a pre-enrollment record.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar']
 *     responses:
 *       200:
 *         description: Successfully deleted pre-enrollment
 *       404:
 *         description: Pre-enrollment not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authorize('registrar'), deletePreEnrollment);

export default router;
