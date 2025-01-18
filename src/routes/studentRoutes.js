  import express from 'express'; 
  import {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
  } from '../controllers/studentController.js';
  import { protect, authorize } from '../middlewares/authMiddleware.js';
  import { login, logout } from '../controllers/authController.js';

  const router = express.Router();

  // Public route for login
  router.post('/login', login);

  // Protected routes
  router.use(protect);
  router.post('/logout', logout); 

  /**
   * @swagger
   * tags:
   *   name: Students
   *   description: API for managing students
   */

  /**
   * @swagger
   * /api/students:
   *   get:
   *     summary: Get all students
   *     tags: [Students]
   *     description: >
   *       **Roles Allowed:** `department_head`, `registrar`  
   *       Retrieve a list of all students.
   *     security:
   *       - bearerAuth: []
   *     x-authorize: ['department_head', 'registrar']
   *     responses:
   *       200:
   *         description: A list of students
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
   *                       contact_number:
   *                         type: string
   *                       address:
   *                         type: string
   *                       date_of_birth:
   *                         type: string
   *                         format: date
   *                       student_type:
   *                         type: string
   *                       standing_year:
   *                         type: integer
   *                       semester:
   *                         type: string
   *                       program_id:
   *                         type: integer
   *                 example:
   *                   status: 200
   *                   data: 
   *                     - id: 146
   *                       first_name: "stud"
   *                       middle_name: "stud"
   *                       last_name: "stud"
   *                       email: "stud.stud@cvsu.ph"
   *                       contact_number: "111-111-111"
   *                       address: "Bacoor Cavite"
   *                       date_of_birth: "2000-02-20"
   *                       student_type: "Regular"
   *                       standing_year: 2
   *                       semester: "2nd"
   *                       program_id: 2
   *       401:
   *         description: Unauthorized
   */
  router.get('/', authorize('department_head', 'registrar'), getAllStudents);

  /**
   * @swagger
   * /api/students/{id}:
   *   get:
   *     summary: Get a student by ID
   *     tags: [Students]
   *     description: >
   *       **Roles Allowed:** `department_head`, `registrar`  
   *       Retrieve a specific student by their ID.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: The student ID
   *         schema:
   *           type: integer
   *     security:
   *       - bearerAuth: []
   *     x-authorize: ['department_head', 'registrar']
   *     responses:
   *       200:
   *         description: A student object
   *       404:
   *         description: Student not found
   *       401:
   *         description: Unauthorized
   */
  router.get('/:id', authorize('department_head', 'registrar' , 'student'), getStudentById);

  /**
   * @swagger
   * /api/students:
   *   post:
   *     summary: Create a new student
   *     tags: [Students]
   *     description: >
   *       **Roles Allowed:** `registrar`  
   *       Add a new student to the system.
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
   *               contact_number:
   *                 type: string
   *               address:
   *                 type: string
   *               date_of_birth:
   *                 type: string
   *                 format: date
   *               student_type:
   *                 type: string
   *               standing_year:
   *                 type: integer
   *               semester:
   *                 type: string
   *               program_id:
   *                 type: integer
   *             example:
   *               first_name: "stud"
   *               middle_name: "stud"
   *               last_name: "stud"
   *               contact_number: "111-111-111"
   *               address: "Bacoor Cavite"
   *               date_of_birth: "2000-02-20"
   *               student_type: "Regular"
   *               standing_year: 2
   *               semester: "2nd"
   *               program_id: 2
   *     security:
   *       - bearerAuth: []
   *     x-authorize: ['registrar']
   *     responses:
   *       201:
   *         description: Successfully created student
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized
   */
  router.post('/', authorize('registrar'), createStudent);

  /**
   * @swagger
   * /api/students/{id}:
   *   put:
   *     summary: Update a student by ID
   *     tags: [Students]
   *     description: >
   *       **Roles Allowed:** `registrar`  
   *       Update details of a specific student.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: The student ID
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
   *               contact_number:
   *                 type: string
   *               address:
   *                 type: string
   *               date_of_birth:
   *                 type: string
   *                 format: date
   *               student_type:
   *                 type: string
   *               standing_year:
   *                 type: integer
   *               semester:
   *                 type: string
   *               program_id:
   *                 type: integer
   *             example:
   *               first_name: "stud"
   *               middle_name: "stud"
   *               last_name: "stud"
   *               contact_number: "111-111-111"
   *               address: "Bacoor Cavite"
   *               date_of_birth: "2000-02-20"
   *               student_type: "Regular"
   *               standing_year: 2
   *               semester: "2nd"
   *               program_id: 2
   *     security:
   *       - bearerAuth: []
   *     x-authorize: ['registrar']
   *     responses:
   *       200:
   *         description: Successfully updated student
   *       400:
   *         description: Bad request
   *       404:
   *         description: Student not found
   *       401:
   *         description: Unauthorized
   */
  router.put('/:id', authorize('registrar'), updateStudent);

  /**
   * @swagger
   * /api/students/{id}:
   *   delete:
   *     summary: Delete a student by ID
   *     tags: [Students]
   *     description: >
   *       **Roles Allowed:** `registrar`  
   *       Remove a student from the system.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: The student ID
   *         schema:
   *           type: integer
   *     security:
   *       - bearerAuth: []
   *     x-authorize: ['registrar']
   *     responses:
   *       200:
   *         description: Successfully deleted student
   *       404:
   *         description: Student not found
   *       401:
   *         description: Unauthorized
   */
  router.delete('/:id', authorize('registrar'), deleteStudent);

  export default router;
