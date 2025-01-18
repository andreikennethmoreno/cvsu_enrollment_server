import express from 'express';
import {
  getAllPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram,
} from '../controllers/programController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protect all routes below this and ensure authenticated access
router.use(protect); 

/**
 * @swagger
 * tags:
 *   name: Programs
 *   description: API for managing programs
 */

/**
 * @swagger
 * /api/programs:
 *   get:
 *     summary: Get all programs
 *     tags: [Programs]
 *     description: >
 *       **Roles Allowed:** `department_head`, `registrar`  
 *       Retrieve a list of all programs available in the system.
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['department_head', 'registrar']
 *     responses:
 *       200:
 *         description: A list of programs
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
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                 example:
 *                   status: 200
 *                   data: 
 *                     - id: 1
 *                       name: "Computer Science"
 *                       description: "Bachelor's program in Computer Science."
 *       401:
 *         description: Unauthorized
 */
router.get('/', authorize('department_head', 'registrar'), getAllPrograms);

/**
 * @swagger
 * /api/programs/{id}:
 *   get:
 *     summary: Get a program by ID
 *     tags: [Programs]
 *     description: >
 *       **Roles Allowed:** `department_head`, `registrar`  
 *       Retrieve a specific program by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The program ID
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['department_head', 'registrar']
 *     responses:
 *       200:
 *         description: A program object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 example:
 *                   id: 1
 *                   name: "Computer Science"
 *                   description: "Bachelor's program in Computer Science."
 *       404:
 *         description: Program not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authorize('department_head', 'registrar'), getProgramById);

/**
 * @swagger
 * /api/programs:
 *   post:
 *     summary: Create a new program
 *     tags: [Programs]
 *     description: >
 *       **Roles Allowed:** `registrar`  
 *       Add a new program to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               name: "Electrical Engineering"
 *               description: "Bachelor's program in Electrical Engineering."
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar']
 *     responses:
 *       201:
 *         description: Successfully created program
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/', authorize('registrar'), createProgram);

/**
 * @swagger
 * /api/programs/{id}:
 *   put:
 *     summary: Update a program by ID
 *     tags: [Programs]
 *     description: >
 *       **Roles Allowed:** `registrar`  
 *       Update the details of a specific program.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The program ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               name: "Mechanical Engineering"
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar']
 *     responses:
 *       200:
 *         description: Successfully updated program
 *       400:
 *         description: Bad request
 *       404:
 *         description: Program not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authorize('registrar'), updateProgram);

/**
 * @swagger
 * /api/programs/{id}:
 *   delete:
 *     summary: Delete a program by ID
 *     tags: [Programs]
 *     description: >
 *       **Roles Allowed:** `registrar`  
 *       Remove a program from the system.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The program ID
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar']
 *     responses:
 *       200:
 *         description: Successfully deleted program
 *       404:
 *         description: Program not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authorize('registrar'), deleteProgram);

export default router;
