import express from 'express';
import {
  getAllDepartmentHeads,
  getDepartmentHeadById,
  createDepartmentHead,
  updateDepartmentHead,
  deleteDepartmentHead,
} from '../controllers/departmentHeadController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protect all routes below this, requiring authentication
router.use(protect); 

/**
 * @swagger
 * tags:
 *   name: DepartmentHeads
 *   description: API for managing department heads
 */

/**
 * @swagger
 * /api/departmentheads:
 *   get:
 *     summary: Get all department heads
 *     tags: [DepartmentHeads]
 *     description: >
 *       **Roles Allowed:** `registrar`, `department_head`  
 *       Retrieve a list of all department heads.
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar', 'department_head']
 *     responses:
 *       200:
 *         description: A list of department heads
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
 *                       program_id:
 *                         type: integer
 *                 example:
 *                   status: 200
 *                   data:
 *                     - id: 23
 *                       first_name: "dept"
 *                       middle_name: "dept"
 *                       last_name: "dept"
 *                       email: "dept.dept@cvsu.ph.com"
 *                       password: "$2b$10$paVtsQ8ONHAIsZfss3IoAehZLxBX1qLfSXOERanbvkPq6BIEE5gfO"
 *                       program_id: 1
 *       401:
 *         description: Unauthorized
 */
router.get('/', authorize('registrar'), getAllDepartmentHeads);

/**
 * @swagger
 * /api/departmentheads/{id}:
 *   get:
 *     summary: Get a department head by ID
 *     tags: [DepartmentHeads]
 *     description: >
 *       **Roles Allowed:** `registrar`, `department_head`  
 *       Retrieve a specific department head by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The department head ID
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar', 'department_head']
 *     responses:
 *       200:
 *         description: A department head object
 *       404:
 *         description: Department head not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authorize('registrar', 'department_head'), getDepartmentHeadById);

/**
 * @swagger
 * /api/departmentheads:
 *   post:
 *     summary: Create a new department head
 *     tags: [DepartmentHeads]
 *     description: >
 *       **Roles Allowed:** `registrar`  
 *       Add a new department head to the system.
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
 *               first_name: "dept"
 *               middle_name: "dept"
 *               last_name: "dept"
 *               password: "dept"
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar']
 *     responses:
 *       201:
 *         description: Successfully created department head
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/', authorize('registrar'), createDepartmentHead);

/**
 * @swagger
 * /api/departmentheads/{id}:
 *   put:
 *     summary: Update a department head by ID
 *     tags: [DepartmentHeads]
 *     description: >
 *       **Roles Allowed:** `registrar`, `department_head`  
 *       Update details of a specific department head.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The department head ID
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
 *               first_name: "dept"
 *               middle_name: "dept"
 *               last_name: "dept"
 *               password: "newpassword"
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar', 'department_head']
 *     responses:
 *       200:
 *         description: Successfully updated department head
 *       400:
 *         description: Bad request
 *       404:
 *         description: Department head not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authorize('registrar', 'department_head'), updateDepartmentHead);

/**
 * @swagger
 * /api/departmentheads/{id}:
 *   delete:
 *     summary: Delete a department head by ID
 *     tags: [DepartmentHeads]
 *     description: >
 *       **Roles Allowed:** `registrar`  
 *       Remove a department head from the system.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The department head ID
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     x-authorize: ['registrar']
 *     responses:
 *       200:
 *         description: Successfully deleted department head
 *       404:
 *         description: Department head not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authorize('registrar'), deleteDepartmentHead);

export default router;
