import request from 'supertest';
import app from '../src/app'; // Assuming your Express app is exported from this file

describe('Checklist Routes Tests', () => {
  let registrarToken, deptHeadToken;
  let createdChecklistId;

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

  // Sample checklist data
  const newChecklist = {
    program_id: 1,
    year_level: 1,
    semester: '1st semester',
    course_code: 'CS102',
    prerequisite_course_code: 'CS50',
    adviser_id: 2,
    start_year: 2024,
    end_year: 2025,
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

  describe('POST /api/checklists', () => {
    it('should allow registrar to create a checklist', async () => {
      const res = await request(app)
        .post('/api/checklists')
        .send(newChecklist)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(201);
      createdChecklistId = res.body.data.id;
      console.log('Newly created checklist:', JSON.stringify(res.body, null, 2));
    });

    it('should return 403 for department_head trying to create a checklist', async () => {
      const res = await request(app)
        .post('/api/checklists')
        .send(newChecklist)
        .set('Authorization', `Bearer ${deptHeadToken}`);

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('Forbidden: Access denied');
    });

    it('should return 400 if required fields are missing', async () => {
      const res = await request(app)
        .post('/api/checklists')
        .send({})
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('program id is required'); // Replace with actual validation error from your controller
    });
  });

  describe('GET /api/checklists', () => {
    it('should allow registrar to view all checklists', async () => {
      const res = await request(app)
        .get('/api/checklists')
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(200);
    });

    it('should allow department_head to view all checklists', async () => {
      const res = await request(app)
        .get('/api/checklists')
        .set('Authorization', `Bearer ${deptHeadToken}`);

      expect(res.status).toBe(200);
    });

    it('should return 401 if no token is provided', async () => {
      const res = await request(app).get('/api/checklists');

      expect(res.status).toBe(401);
      expect(res.body.error).toBe('Unauthorized');
    });
  });

  describe('GET /api/checklists/:id', () => {
    it('should allow registrar to view a specific checklist by ID', async () => {
      const res = await request(app)
        .get(`/api/checklists/${createdChecklistId}`)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(createdChecklistId);
    });

    it('should return 404 if the checklist is not found', async () => {
      const nonExistentChecklistId = 999;

      const res = await request(app)
        .get(`/api/checklists/${nonExistentChecklistId}`)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Checklist not found');
    });
  });

  describe('PUT /api/checklists/:id', () => {
    it('should allow registrar to update a checklist', async () => {
      const updatedData = {
        ...newChecklist,
        course_code: 'CS50',
      };

      const res = await request(app)
        .put(`/api/checklists/${createdChecklistId}`)
        .send(updatedData)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(200);
      console.log('Updated checklist:', JSON.stringify(res.body, null, 2));
    });

    it('should return 403 for department_head trying to update a checklist', async () => {
      const updatedData = {
        ...newChecklist,
        course_code: 'CS50',
      };

      const res = await request(app)
        .put(`/api/checklists/${createdChecklistId}`)
        .send(updatedData)
        .set('Authorization', `Bearer ${deptHeadToken}`);

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('Forbidden: Access denied');
    });
  });

  describe('DELETE /api/checklists/:id', () => {
    it('should allow registrar to delete a checklist', async () => {
      const res = await request(app)
        .delete(`/api/checklists/${createdChecklistId}`)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(200);
    });

    it('should return 403 for department_head trying to delete a checklist', async () => {
      const res = await request(app)
        .delete(`/api/checklists/${createdChecklistId}`)
        .set('Authorization', `Bearer ${deptHeadToken}`);

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('Forbidden: Access denied');
    });
  });
});
