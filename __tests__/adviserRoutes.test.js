import request from 'supertest';
import app from '../src/app'; // Assuming your Express app is exported from this file

describe('Adviser Routes Tests', () => {
  let registrarToken, adviserToken;
  let createdAdviserId, createdAdviserEmail, createdAdviserPassword;

  // User credentials for login
  const users = {
    registrar: {
      email: 'regis.regis@cvsu.ph.com',
      password: 'regis',
      role: 'registrar',
    },
    adviser: {
      email: 'advadv.adv@cvsu.edu.ph',
      password: 'adv',
      role: 'adviser',
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
    adviserToken = await loginUser(users.adviser.email, users.adviser.password, users.adviser.role);
  });

  describe('POST /api/advisers', () => {
    it('should allow registrar to create an adviser', async () => {
      createdAdviserPassword = "securepassword";
      const newAdviser = {
        first_name: 'John23',
        middle_name: 'A.',
        last_name: 'Doe',
        password: createdAdviserPassword,
        contact_number: "123123456",
        program_id: 1, 
      };
      console.log("this is registrar token" + registrarToken)

      const res = await request(app)
        .post('/api/advisers')
        .send(newAdviser)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(201);
      createdAdviserId = res.body.data.id;
      createdAdviserEmail = res.body.data.email;
      console.log('Newly created adviser:', JSON.stringify(res.body, null, 2));
    });

    it('should return 403 for adviser role trying to create an adviser', async () => {
      const newAdviser = {
        first_name: 'Alice',
        middle_name: 'B.',
        last_name: 'Smith',
        password: 'securepassword',
        program_id: 1, // Add program_id as per the database schema
      };

      const res = await request(app)
        .post('/api/advisers')
        .send(newAdviser)
        .set('Authorization', `Bearer ${adviserToken}`);

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('Forbidden: Access denied');
    });

    it('should return 400 if required field is missing in create adviser request', async () => {
      const newAdviser = {
        first_name: 'Charlie',
        // Missing last_name
        middle_name: 'C.',
        password: 'securepassword',
        program_id: 1, // Add program_id as per the database schema
      };

      const res = await request(app)
        .post('/api/advisers')
        .send(newAdviser)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('last name is required');
    });
  });

  describe('GET /api/advisers', () => {
    it('should allow access to registrar role to view all advisers', async () => {
      const res = await request(app)
        .get('/api/advisers')
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(200);
    });

    it('should return 403 for adviser role accessing all advisers', async () => {
      const res = await request(app)
        .get('/api/advisers')
        .set('Authorization', `Bearer ${adviserToken}`);

      expect(res.status).toBe(403);
    });

    it('should return 401 for no token provided', async () => {
      const res = await request(app).get('/api/advisers');

      expect(res.status).toBe(401);
    });
  });

  
  describe('POST /api/auth/login', () => {
    it('should log in the newly created student and retrieve their ID', async () => {
      try {
        // Log in the student using the loginUser function
        let createdAdviserToken = await loginUser(createdAdviserEmail, createdAdviserPassword, users.adviser.role);
    
        expect(createdAdviserToken).toBeDefined();
        console.log('Logged in student createdAdviserToken:', createdAdviserToken);
    
        const studentRes = await request(app)
          .get(`/api/advisers/${createdAdviserId}`)
          .set('Authorization', `Bearer ${createdAdviserToken}`);
    
        expect(studentRes.status).toBe(200);
        expect(studentRes.body.data.id).toBe(createdAdviserId);
      } catch (error) {
        console.error('Error during login or student retrieval:', error);
      }
    });
  });
  


  describe('GET /api/advisers/:id', () => {
    it('should return adviser details for registrar role', async () => {
      const res = await request(app)
        .get(`/api/advisers/${createdAdviserId}`)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(createdAdviserId);
    });

    it('should return 403 for adviser role trying to access another adviser\'s data', async () => {
      const anotherAdviserId = 2; // Replace with an actual adviser ID

      const res = await request(app)
        .get(`/api/advisers/${anotherAdviserId}`)
        .set('Authorization', `Bearer ${adviserToken}`);

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('Forbidden: You can only view your own data');
    });

    it('should return 404 if adviser not found', async () => {
      const nonExistentAdviserId = 999;
      const res = await request(app)
        .get(`/api/advisers/${nonExistentAdviserId}`)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Adviser not found');
    });
  });

  describe('PUT /api/advisers/:id', () => {
    it('should allow registrar to update adviser information', async () => {
      const updatedData = {
        first_name: 'Updated John',
        middle_name: 'B.',
        last_name: 'Updated Doe',
        password: 'newsecurepassword',
        contact_number: "123123456",
        program_id: 1, // Add program_id as per the database schema
      };

      const res = await request(app)
        .put(`/api/advisers/${createdAdviserId}`)
        .send(updatedData)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(200);
      console.log('Updated adviser:', JSON.stringify(res.body, null, 2));
    });

    it('should return 403 for adviser role trying to update another adviser\'s data', async () => {
      const anotherAdviserId = 2; // Replace with an actual adviser ID
      const updatedData = {
        first_name: 'Updated Alice',
        middle_name: 'B.',
        last_name: 'Updated Smith',
        password: 'newsecurepassword',
        contact_number: "123123456",
        program_id: 1, // Add program_id as per the database schema
      };

      const res = await request(app)
        .put(`/api/advisers/${anotherAdviserId}`)
        .send(updatedData)
        .set('Authorization', `Bearer ${adviserToken}`);

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('Forbidden: You can only update your own data');
    });
  });

  describe('DELETE /api/advisers/:id', () => {
    it('should allow registrar to delete an adviser', async () => {
      const res = await request(app)
        .delete(`/api/advisers/${createdAdviserId}`)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(200);
    });

    it('should return 403 for adviser role trying to delete an adviser', async () => {
      const res = await request(app)
        .delete(`/api/advisers/${createdAdviserId}`)
        .set('Authorization', `Bearer ${adviserToken}`);

      expect(res.status).toBe(403);
    });
  });
});
