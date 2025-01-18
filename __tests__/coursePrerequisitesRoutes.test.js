import request from 'supertest';
import app from '../src/app'; // Assuming your Express app is exported from this file

describe('Course Prerequisite Routes Tests', () => {
  let registrarToken, deptHeadToken;
  let createdCoursePrerequisiteId;

  // User credentials for login
  const users = {
    registrar: {
      email: 'regis.regis@cvsu.ph.com',
      password: 'regis',
      role: 'registrar',
    },
    department_head: {
      email: 'dept.dept@cvsu.ph.com',
      password: 'dept',
      role: 'department_head',
    },
  };

  // Function to log in a user and retrieve their token
  const loginUser = async (email, password, role) => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email, password, role });

    if (res.status !== 200) {
      throw new Error(`Login failed for ${email} with role ${role}: ${res.body.message}`);
    }

    return res.body.token;
  };

  beforeAll(async () => {
    registrarToken = await loginUser(users.registrar.email, users.registrar.password, users.registrar.role);
    deptHeadToken = await loginUser(users.department_head.email, users.department_head.password, users.department_head.role);
  });

  describe('POST /api/coursePrerequisite', () => {
    it('should allow registrar to create a course prerequisite', async () => {
      const newCoursePrerequisite = {
        course_code: 'CS102',
        prerequisite_course_code: 'CS50',
      };

      const res = await request(app)
        .post('/api/coursePrerequisite')
        .send(newCoursePrerequisite)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(201);
      createdCoursePrerequisiteId = res.body.data.id;
      console.log('Created course prerequisite:', JSON.stringify(res.body, null, 2));
    });

    it('should return 403 for department_head role trying to create a course prerequisite', async () => {
      const newCoursePrerequisite = {
        course_code: 'CS103',
        prerequisite_course_code: 'CS101',
      };

      const res = await request(app)
        .post('/api/coursePrerequisite')
        .send(newCoursePrerequisite)
        .set('Authorization', `Bearer ${deptHeadToken}`);

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('Forbidden: Access denied');
    });

    it('should return 400 if required fields are missing', async () => {
      const newCoursePrerequisite = {};

      const res = await request(app)
        .post('/api/coursePrerequisite')
        .send(newCoursePrerequisite)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('course code is required');
    });
  });

  describe('GET /api/coursePrerequisite', () => {
    it('should allow registrar to view all course prerequisites', async () => {
      const res = await request(app)
        .get('/api/coursePrerequisite')
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(200);
    });

    it('should allow department_head to view all course prerequisites', async () => {
      const res = await request(app)
        .get('/api/coursePrerequisite')
        .set('Authorization', `Bearer ${deptHeadToken}`);

      expect(res.status).toBe(200);
    });

    it('should return 401 if no token is provided', async () => {
      const res = await request(app).get('/api/coursePrerequisite');

      expect(res.status).toBe(401);
      expect(res.body.error).toBe('Unauthorized');
    });
  });

  describe('GET /api/coursePrerequisite/:id', () => {
    it('should allow registrar to view a specific course prerequisite by ID', async () => {
      const res = await request(app)
        .get(`/api/coursePrerequisite/${createdCoursePrerequisiteId}`)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(createdCoursePrerequisiteId);
    });

    it('should return 404 if the course prerequisite is not found', async () => {
      const nonExistentCoursePrerequisiteId = 999;

      const res = await request(app)
        .get(`/api/coursePrerequisite/${nonExistentCoursePrerequisiteId}`)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Course Prerequisite not found');
    });
  });

  describe('PUT /api/coursePrerequisite/:id', () => {
    it('should allow registrar to update course prerequisite', async () => {
      const updatedData = {
        course_code: 'CS50',
        prerequisite_course_code: 'CS102',
      };

      const res = await request(app)
        .put(`/api/coursePrerequisite/${createdCoursePrerequisiteId}`)
        .send(updatedData)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(200);
      console.log('Updated course prerequisite:', JSON.stringify(res.body, null, 2));
    });

    it('should return 403 for department_head role trying to update a course prerequisite', async () => {
      const updatedData = {
        course_code: 'CS104',
        prerequisite_course_code: 'CS103',
      };

      const res = await request(app)
        .put(`/api/coursePrerequisite/${createdCoursePrerequisiteId}`)
        .send(updatedData)
        .set('Authorization', `Bearer ${deptHeadToken}`);

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('Forbidden: Access denied');
    });
  });

  describe('DELETE /api/coursePrerequisite/:id', () => {
    it('should allow registrar to delete a course prerequisite', async () => {
      const res = await request(app)
        .delete(`/api/coursePrerequisite/${createdCoursePrerequisiteId}`)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(200);
    });

    it('should return 403 for department_head role trying to delete a course prerequisite', async () => {
      const res = await request(app)
        .delete(`/api/coursePrerequisite/${createdCoursePrerequisiteId}`)
        .set('Authorization', `Bearer ${deptHeadToken}`);

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('Forbidden: Access denied');
    });
  });
});
