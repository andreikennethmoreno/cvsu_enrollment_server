import express from 'express';
import { login, logout } from '../controllers/authController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     description: |
 *       This endpoint allows users to log in. The `role` field is extremely important, 
 *       as it determines the user's access rights. The possible roles are:
 *       - `department_head`: Department Head with admin-level access to department resources.
 *       - `registrar`: Registrar with access to student and course management resources.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user.user@cvsu.ph.com"
 *               password:
 *                 type: string
 *                 example: "user"
 *               role:
 *                 type: string
 *                 description: |
 *                   **IMPORTANT**: The user's role determines their access level.
 *                   Choose one of the following roles:
 *                   - `department_head`: TODO Add table role access here.
 *                   - `registrar`: TODO Add table role access here.
 *                   - `student` : Read access to their own details
 *                 enum:
 *                   - department_head
 *                   - registrar
 *                   - student
 *                 example: "student"
 *             required:
 *               - email
 *               - password
 *               - role
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InJlZ2lzdHJhciIsImlhdCI6MTczMTg1NTcxMiwiZXhwIjoxNzMxODYyOTEyfQ.CVdxtqbJYqZmfVH9dWN2kUg7YhkpoOuvuNiHQXhiF3E"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     first_name:
 *                       type: string
 *                       example: "user"
 *                     middle_name:
 *                       type: string
 *                       example: ""
 *                     last_name:
 *                       type: string
 *                       example: "user"
 *                     email:
 *                       type: string
 *                       example: "user.user@cvsu.ph.com"
 *                     password:
 *                       type: string
 *                       example: "$2b$10$8PojqnyZsEiPMrIfpmxa6eQgM7Z2oRQEZr13xzHRBZA93965OznQ6"
 *       401:
 *         description: Invalid credentials
 */

router.post('/login', login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Log out a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post('/logout', logout);

export default router;
