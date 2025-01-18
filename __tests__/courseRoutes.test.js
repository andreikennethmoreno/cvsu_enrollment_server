import request from 'supertest';
import app from '../src/app'; // Assuming your Express app is exported from this file

describe('Course Routes Tests', () => {
  let registrarToken, deptHeadToken;
  let createdCourseId;

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

  describe('POST /api/courses', () => {
    it('should allow registrar to create a course', async () => {
      const newCourse = {
        course_code: 'CS101',
        course_title: 'Computer Science 101',
        credit_unit_lec: 3,
        credit_unit_lab: 2,
      };
      const res = await request(app)
        .post('/api/courses')
        .send(newCourse)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(201);
      createdCourseId = res.body.data.id;
      console.log('Newly created course:', JSON.stringify(res.body, null, 2));
    });

    it('should return 403 for department_head role trying to create a course', async () => {
      const newCourse = {
        course_code: 'CS102',
        course_title: 'Computer Science 102',
        credit_unit_lec: 3,
        credit_unit_lab: 2,
      };

      const res = await request(app)
        .post('/api/courses')
        .send(newCourse)
        .set('Authorization', `Bearer ${deptHeadToken}`);

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('Forbidden: Access denied');
    });

    it('should return 400 if required fields are missing', async () => {
      const newCourse = {};

      const res = await request(app)
        .post('/api/courses')
        .send(newCourse)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('course code is required');
    });
  });

  describe('GET /api/courses', () => {
    it('should allow access to registrar to view all courses', async () => {
      const res = await request(app)
        .get('/api/courses')
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(200);
    });

    it('should allow access to department_head to view all courses', async () => {
      const res = await request(app)
        .get('/api/courses')
        .set('Authorization', `Bearer ${deptHeadToken}`);

      expect(res.status).toBe(200);
    });

    it('should return 401 if no token is provided', async () => {
      const res = await request(app).get('/api/courses');

      expect(res.status).toBe(401);
      expect(res.body.error).toBe('Unauthorized');
    });
  });

  describe('GET /api/courses/:id', () => {
    it('should allow registrar to view a specific course by ID', async () => {
      const res = await request(app)
        .get(`/api/courses/${createdCourseId}`)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(createdCourseId);
    });

    it('should return 404 if the course is not found', async () => {
      const nonExistentCourseId = 999;

      const res = await request(app)
        .get(`/api/courses/${nonExistentCourseId}`)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Course not found');
    });
  });

  describe('PUT /api/courses/:id', () => {
    it('should allow registrar to update course information', async () => {
      const updatedData = {
        course_code: 'CS101',
        course_title: 'Updated Computer Science 101',
        credit_unit_lec: 4,
        credit_unit_lab: 2,
      };

      const res = await request(app)
        .put(`/api/courses/${createdCourseId}`)
        .send(updatedData)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(200);
      console.log('Updated course:', JSON.stringify(res.body, null, 2));
    });

    it('should return 403 for department_head role trying to update a course', async () => {
      const updatedData = {
        course_code: 'CS101',
        course_title: 'Updated Computer Science 101',
        credit_unit_lec: 4,
        credit_unit_lab: 2,
      };

      const res = await request(app)
        .put(`/api/courses/${createdCourseId}`)
        .send(updatedData)
        .set('Authorization', `Bearer ${deptHeadToken}`);

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('Forbidden: Access denied');
    });
  });

  describe('DELETE /api/courses/:id', () => {
    it('should allow registrar to delete a course', async () => {
      const res = await request(app)
        .delete(`/api/courses/${createdCourseId}`)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(200);
    });

    it('should return 403 for department_head role trying to delete a course', async () => {
      const res = await request(app)
        .delete(`/api/courses/${createdCourseId}`)
        .set('Authorization', `Bearer ${deptHeadToken}`);

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('Forbidden: Access denied');
    });
  });
});
