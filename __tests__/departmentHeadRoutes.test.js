import request from 'supertest';
import app from '../src/app'; // Assuming your Express app is exported from this file

describe('Department Head Routes Tests', () => {
  let registrarToken, deptHeadToken;
  let createdDepartmentHeadId, createdDepartmentHeadEmail, createdDepartmentHeadPassword;

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
    // Authenticate users and retrieve tokens dynamically
    registrarToken = await loginUser(users.registrar.email, users.registrar.password, users.registrar.role);
    deptHeadToken = await loginUser(users.department_head.email, users.department_head.password, users.department_head.role);
  });

  describe('POST /api/departmentheads', () => {
    it('should allow registrar to create a department head', async () => {
        createdDepartmentHeadPassword = "123";
        const newDepartmentHead = {
        first_name: 'Alice',
        middle_name: 'Marie', 
        last_name: 'Johnson',
        password: createdDepartmentHeadPassword,
        program_id: 1,  // Add program_id as per the database schema
      };

      const res = await request(app)
        .post('/api/departmentheads')
        .send(newDepartmentHead)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(201);
      createdDepartmentHeadId = res.body.data.id;
      createdDepartmentHeadEmail = res.body.data.email;
      console.log('Newly created department head:', JSON.stringify(res.body, null, 2));
    });

    it('should return 403 for department_head role trying to create a department head', async () => {
      const newDepartmentHead = {
        first_name: 'Bob',
        middle_name: 'Louis',  // Adding middle name
        last_name: 'Smith',
        password: 'securepassword',
        program_id: 1,  // Add program_id as per the database schema
      };

      const res = await request(app)
        .post('/api/departmentheads')
        .send(newDepartmentHead)
        .set('Authorization', `Bearer ${deptHeadToken}`);

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('Forbidden: Access denied');
    });

    it('should return 400 if required field is missing in create department head request', async () => {
      const newDepartmentHead = {
        first_name: 'Charlie',
        // Missing last_name
        middle_name: 'Ray',  // Adding middle name
        password: 'securepassword',
        program_id: 1,  // Add program_id as per the database schema
      };

      const res = await request(app)
        .post('/api/departmentheads')
        .send(newDepartmentHead)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('last name is required');
    });
  });

  describe('GET /api/departmentheads', () => {
    it('should allow access to registrar role to view all department heads', async () => {
      const res = await request(app)
        .get('/api/departmentheads')
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(200);
    });

    it('should return 403 for department_head role accessing all department heads', async () => {
      const res = await request(app)
        .get('/api/departmentheads')
        .set('Authorization', `Bearer ${deptHeadToken}`);

      expect(res.status).toBe(403);
    });

    it('should return 401 for no token provided', async () => {
      const res = await request(app).get('/api/departmentheads');

      expect(res.status).toBe(401);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should log in the newly created department head and retrieve their ID', async () => {
      try {
        // Log in the department head using the loginUser function
        let createdDepartmentHeadToken = await loginUser(
          createdDepartmentHeadEmail, 
          createdDepartmentHeadPassword, 
          'department_head'
        );
  
        expect(createdDepartmentHeadToken).toBeDefined();
        console.log('Logged in department head createdDepartmentHeadToken:', createdDepartmentHeadToken);
  
        // Retrieve the department head's data using their ID
        const departmentHeadRes = await request(app)
          .get(`/api/departmentheads/${createdDepartmentHeadId}`)
          .set('Authorization', `Bearer ${createdDepartmentHeadToken}`);
  
        expect(departmentHeadRes.status).toBe(200);
        expect(departmentHeadRes.body.data.id).toBe(createdDepartmentHeadId);
      } catch (error) {
        console.error('Error during login or department head retrieval:', error);
      }
    });
  });

  describe('GET /api/departmentheads/:id', () => {
    

    it('should return 403 for department head trying to access another department head\'s data', async () => {
      const anotherDepartmentHeadId = 2; // Replace with an actual department head ID

      const res = await request(app)
        .get(`/api/departmentheads/${anotherDepartmentHeadId}`)
        .set('Authorization', `Bearer ${deptHeadToken}`);

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('Forbidden: You can only view your own data');
    });

    it('should return 404 if department head not found', async () => {
      const nonExistentDepartmentHeadId = 999;
      const res = await request(app)
        .get(`/api/departmentheads/${nonExistentDepartmentHeadId}`)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Department Head not found');
    });
  });

  describe('PUT /api/departmentheads/:id', () => {
    it('should allow registrar to update department head information', async () => {
      const updatedData = {
        first_name: 'Updated Alice',
        middle_name: 'Marie',  // Adding middle name
        last_name: 'Updated Johnson',
        password: 'newsecurepassword',
        program_id: 1,  // Add program_id as per the database schema
      };

      const res = await request(app)
        .put(`/api/departmentheads/${createdDepartmentHeadId}`)
        .send(updatedData)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(200);
      console.log('Updated department head:', JSON.stringify(res.body, null, 2));
    });

    it('should return 403 for department head trying to update another department head\'s data', async () => {
      const anotherDepartmentHeadId = 2; // Replace with an actual department head ID
      const updatedData = {
        first_name: 'Updated Bob',
        middle_name: 'Louis',  // Adding middle name
        last_name: 'Updated Smith',
        password: 'newsecurepassword',
        program_id: 1,  // Add program_id as per the database schema
      };

      const res = await request(app)
        .put(`/api/departmentheads/${anotherDepartmentHeadId}`)
        .send(updatedData)
        .set('Authorization', `Bearer ${deptHeadToken}`);

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('Forbidden: You can only update your own data');
    });
  });

  describe('DELETE /api/departmentheads/:id', () => {
    it('should allow registrar to delete a department head', async () => {
      const res = await request(app)
        .delete(`/api/departmentheads/${createdDepartmentHeadId}`)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(200);
    });

    it('should return 403 for department head role trying to delete a department head', async () => {
      const res = await request(app)
        .delete(`/api/departmentheads/${createdDepartmentHeadId}`)
        .set('Authorization', `Bearer ${deptHeadToken}`);

      expect(res.status).toBe(403);
    });
  });
});
