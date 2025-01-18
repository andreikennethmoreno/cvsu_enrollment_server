import express from 'express';
import {
  getAllAdvisers,
  getAdviserById,
  createAdviser,
  updateAdviser,
  deleteAdviser,
} from '../controllers/adviserController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protect all routes below this
router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Advisers
 *   description: API for managing advisers
 */

/**
 * @swagger
 * /api/advisers:
 *   get:
 *     summary: Get all advisers
 *     tags: [Advisers]
 *     description: >
 *       **Roles Allowed:** `registrar`  
 *       Retrieve a list of all advisers.
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar']
 *     responses:
 *       200:
 *         description: A list of advisers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   first_name:
 *                     type: string
 *                   middle_name:
 *                     type: string
 *                   last_name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   contact_number:
 *                     type: string
 *                   program_id:
 *                     type: integer
 *                 example:
 *                   id: 1
 *                   first_name: "John"
 *                   middle_name: "A."
 *                   last_name: "Doe"
 *                   email: "john.doe@cvsu.edu.ph"
 *                   contact_number: "123456789"
 *                   program_id: 1
 *       401:
 *         description: Unauthorized
 */
router.get('/', authorize('registrar'), getAllAdvisers);

/**
 * @swagger
 * /api/advisers/{id}:
 *   get:
 *     summary: Get an adviser by ID
 *     tags: [Advisers]
 *     description: >
 *       **Roles Allowed:** `registrar`, `adviser`  
 *       Retrieve a specific adviser by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The adviser ID
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar', 'adviser']
 *     responses:
 *       200:
 *         description: Adviser details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 first_name:
 *                   type: string
 *                 middle_name:
 *                   type: string
 *                 last_name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 contact_number:
 *                   type: string
 *                 program_id:
 *                   type: integer
 *                 example:
 *                   id: 1
 *                   first_name: "John"
 *                   middle_name: "A."
 *                   last_name: "Doe"
 *                   email: "john.doe@cvsu.edu.ph"
 *                   contact_number: "123456789"
 *                   program_id: 1
 *       404:
 *         description: Adviser not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authorize('registrar', 'adviser'), getAdviserById);

/**
 * @swagger
 * /api/advisers:
 *   post:
 *     summary: Create a new adviser
 *     tags: [Advisers]
 *     description: >
 *       **Roles Allowed:** `registrar`  
 *       Add a new adviser to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               middle_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               contact_number:
 *                 type: string
 *               password:
 *                 type: string
 *               program_id:
 *                 type: integer
 *             example:
 *               first_name: "adv"
 *               middle_name: "adv"
 *               last_name: "adv"
 *               email: "advadv.adv@cvsu.edu.ph"
 *               contact_number: "123123456"
 *               password: "securepassword"
 *               program_id: 1
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar']
 *     responses:
 *       201:
 *         description: Adviser created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/', authorize('registrar'), createAdviser);

/**
 * @swagger
 * /api/advisers/{id}:
 *   put:
 *     summary: Update an adviser by ID
 *     tags: [Advisers]
 *     description: >
 *       **Roles Allowed:** `registrar`, `adviser`  
 *       Update the details of a specific adviser.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The adviser ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               middle_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               contact_number:
 *                 type: string
 *               program_id:
 *                 type: integer
 *             example:
 *               first_name: "adv"
 *               middle_name: "adv"
 *               last_name: "adv"
 *               email: "advadv.adv@cvsu.edu.ph"
 *               contact_number: "987654321"
 *               program_id: 1
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar', 'adviser']
 *     responses:
 *       200:
 *         description: Adviser updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Adviser not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authorize('registrar', 'adviser'), updateAdviser);

/**
 * @swagger
 * /api/advisers/{id}:
 *   delete:
 *     summary: Delete an adviser by ID
 *     tags: [Advisers]
 *     description: >
 *       **Roles Allowed:** `registrar`  
 *       Remove an adviser from the system.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The adviser ID
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar']
 *     responses:
 *       200:
 *         description: Adviser deleted successfully
 *       404:
 *         description: Adviser not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authorize('registrar'), deleteAdviser);

export default router;
