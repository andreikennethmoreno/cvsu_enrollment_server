import express from 'express';
import {
  getAllRegistrarHeads,
  getRegistrarHeadById,
  createRegistrarHead,
  updateRegistrarHead,
  deleteRegistrarHead,
} from '../controllers/registrarHeadController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protect all routes below this, and authorize only "registrar" role for CRUD operations
router.use(protect); // Protect all routes from unauthorized access

/**
 * @swagger
 * tags:
 *   name: RegistrarHeads
 *   description: API for managing registrar heads
 */

/**
 * @swagger
 * /api/registrarheads:
 *   get:
 *     summary: Get all registrar heads
 *     tags: [RegistrarHeads]
 *     description: >
 *       **Roles Allowed:** `registrar`  
 *       Retrieve a list of all registrar heads.
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar']
 *     responses:
 *       200:
 *         description: A list of registrar heads
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
 *                       first_name:
 *                         type: string
 *                       middle_name:
 *                         type: string
 *                       last_name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       password:
 *                         type: string
 *                 example:
 *                   status: 200
 *                   data:
 *                     - id: 2
 *                       first_name: "regis"
 *                       middle_name: ""
 *                       last_name: "regis"
 *                       email: "regis.regis@cvsu.ph.com"
 *                       password: "$2b$10$8PojqnyZsEiPMrIfpmxa6eQgM7Z2oRQEZr13xzHRBZA93965OznQ6"
 *       401:
 *         description: Unauthorized
 */
router.get('/', authorize('registrar'), getAllRegistrarHeads);

/**
 * @swagger
 * /api/registrarheads/{id}:
 *   get:
 *     summary: Get a registrar head by ID
 *     tags: [RegistrarHeads]
 *     description: >
 *       **Roles Allowed:** `registrar`  
 *       Retrieve a specific registrar head by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The registrar head ID
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar']
 *     responses:
 *       200:
 *         description: A registrar head object
 *       404:
 *         description: Registrar head not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authorize('registrar'), getRegistrarHeadById);

/**
 * @swagger
 * /api/registrarheads:
 *   post:
 *     summary: Create a new registrar head
 *     tags: [RegistrarHeads]
 *     description: >
 *       **Roles Allowed:** `registrar`  
 *       Add a new registrar head to the system.
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
 *               password:
 *                 type: string
 *             example:
 *               first_name: "regis"
 *               middle_name: "regis"
 *               last_name: "regis"
 *               password: "regis"
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar']
 *     responses:
 *       201:
 *         description: Successfully created registrar head
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/', authorize('registrar'), createRegistrarHead);

/**
 * @swagger
 * /api/registrarheads/{id}:
 *   put:
 *     summary: Update a registrar head by ID
 *     tags: [RegistrarHeads]
 *     description: >
 *       **Roles Allowed:** `registrar`  
 *       Update details of a specific registrar head.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The registrar head ID
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
 *               password:
 *                 type: string
 *             example:
 *               first_name: "regis"
 *               middle_name: "regis"
 *               last_name: "regis"
 *               password: "regis"
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar']
 *     responses:
 *       200:
 *         description: Successfully updated registrar head
 *       400:
 *         description: Bad request
 *       404:
 *         description: Registrar head not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authorize('registrar'), updateRegistrarHead);

/**
 * @swagger
 * /api/registrarheads/{id}:
 *   delete:
 *     summary: Delete a registrar head by ID
 *     tags: [RegistrarHeads]
 *     description: >
 *       **Roles Allowed:** `registrar`  
 *       Remove a registrar head from the system.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The registrar head ID
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar']
 *     responses:
 *       200:
 *         description: Successfully deleted registrar head
 *       404:
 *         description: Registrar head not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authorize('registrar'), deleteRegistrarHead);

export default router;
