import request from 'supertest';
<<<<<<< HEAD
import app from '../src/app.js';

describe('Student Routes', () => {
  let token;
  let createdId; // Store the dynamically created ID

  beforeAll(async () => {
    // Log in to get an authentication token
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'regis.regis@cvsu.ph.com',
        password: 'regis',
        role: 'registrar',
      });
    token = response.body.token;
  });

  test('GET /api/students - should return all students', async () => {
    const response = await request(app)
      .get('/api/students')
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 200);
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test('POST /api/students - should create a new student', async () => {
    const newStudent = {
      first_name: 'John',
      middle_name: 'Doe',
      last_name: 'Smith',
      contact_number: '1234567890',
      address: '123 Main St',
      date_of_birth: '2000-01-01',
      student_type: 'Full-time',
      standing_year: '3',
      semester: 'Fall',
      password: 'password',
      program_id: 1, // Assuming a program with ID 1 exists
    };

    const response = await request(app)
      .post('/api/students')
      .send(newStudent)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('status', 201);
    expect(response.body.data).toHaveProperty('first_name', 'John');

    // Save the dynamic ID for future tests
    createdId = response.body.data.id;
  });

  test('GET /api/students/:id - should return a single student', async () => {
    const response = await request(app)
      .get(`/api/students/${createdId}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('id', createdId);
  });

  test('PUT /api/students/:id - should update a student', async () => {
    const updatedStudent = {
      first_name: 'UpdatedJohn',
      middle_name: 'Doe',
      last_name: 'Smith',
      contact_number: '0987654321',
      address: '456 Secondary St',
      date_of_birth: '2000-01-01',
      student_type: 'Part-time',
      standing_year: '4',
      semester: 'Spring',
      password: 'newpassword',
      program_id: 1, 
    };

    const response = await request(app)
      .put(`/api/students/${createdId}`)
      .send(updatedStudent)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 200);
    expect(response.body.data).toHaveProperty('first_name', 'UpdatedJohn');
  });

  test('DELETE /api/students/:id - should delete a student', async () => {
    const response = await request(app)
      .delete(`/api/students/${createdId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 200);
    expect(response.body.data).toHaveProperty('id', createdId);
  });
});
=======
import app from '../src/app'; // Assuming your Express app is exported from this file

describe('Student Routes Tests', () => {
  let registrarToken, deptHeadToken, studentToken;
  let createdStudentId, createdStudentEmail, createdStudentPassword;

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
    student: {
      email: 'stud.stud@cvsu.ph.com',
      password: 'stud',
      role: 'student',
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
    studentToken = await loginUser(users.student.email, users.student.password, users.student.role);
  });

  describe('POST /api/students', () => {
    it('should allow registrar to create a student', async () => {
      createdStudentPassword = '123';

      const newStudent = {
        first_name: 'John',
        middle_name: 'Doe',
        last_name: 'Smith',
        contact_number: '123-456-7890',
        address: '123 Main St',
        date_of_birth: '2001-01-01',
        student_type: 'Regular',
        standing_year: 1,
        semester: '1st',
        program_id: 1,
        password: createdStudentPassword,
      };

      const res = await request(app)
        .post('/api/students')
        .send(newStudent)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(201);
      console.log('Newly created student:', JSON.stringify(res.body, null, 2));

      createdStudentId = res.body.data.id;
      createdStudentEmail = res.body.data.email;
    });

    it('should return 403 for department_head role trying to create a student', async () => {
      const newStudent = {
        first_name: 'John',
        middle_name: 'Doe',
        last_name: 'Smith',
        contact_number: '123-456-7890',
        address: '123 Main St',
        date_of_birth: '2001-01-01',
        student_type: 'Regular',
        standing_year: 1,
        semester: '1st',
        program_id: 1,
        password: '123',
      };

      const res = await request(app)
        .post('/api/students')
        .send(newStudent)
        .set('Authorization', `Bearer ${deptHeadToken}`);

        expect(res.status).toBe(403);
        expect(res.body.error).toBe('Forbidden: Access denied');
    });

    it('should return 400 if required field is missing in create student request', async () => {
        const newStudent = {
          first_name: 'John',
          last_name: 'Smith',
          contact_number: '123-456-7890',
          address: '123 Main St',
          date_of_birth: '2001-01-01',
          student_type: 'Regular',
          standing_year: 1,
          semester: '1st',
          password: '123',
          // Missing program_id
        };
      
        const res = await request(app)
          .post('/api/students')
          .send(newStudent)
          .set('Authorization', `Bearer ${registrarToken}`);
      
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('program id is required');
      });
      
  });



  describe('POST /api/auth/login', () => {
    it('should log in the newly created student and retrieve their ID', async () => {
      try {
        // Log in the student using the loginUser function
        let createdStudenttoken = await loginUser(createdStudentEmail, createdStudentPassword, users.student.role);
    
        expect(createdStudenttoken).toBeDefined();
        console.log('Logged in student createdStudenttoken:', createdStudenttoken);
    
        const studentRes = await request(app)
          .get(`/api/students/${createdStudentId}`)
          .set('Authorization', `Bearer ${createdStudenttoken}`);
    
        expect(studentRes.status).toBe(200);
        expect(studentRes.body.data.id).toBe(createdStudentId);
      } catch (error) {
        console.error('Error during login or student retrieval:', error);
      }
    });
  });
  


  
  describe('GET /api/students', () => {
    it('should allow access to department_head and registrar roles', async () => {
      const res = await request(app)
        .get('/api/students')
        .set('Authorization', `Bearer ${deptHeadToken}`);

      expect(res.status).toBe(200);
    });

    it('should return 403 for student role', async () => {
      const res = await request(app)
        .get('/api/students')
        .set('Authorization', `Bearer ${studentToken}`);

      expect(res.status).toBe(403);
    });

    it('should return 401 for no token provided', async () => {
      const res = await request(app).get('/api/students');

      expect(res.status).toBe(401);
    });
  });

  describe('GET /api/students/:id', () => {
    it('should allow access to department_head and registrar roles for specific student', async () => {
      const res = await request(app)
        .get(`/api/students/${createdStudentId}`)
        .set('Authorization', `Bearer ${deptHeadToken}`);

      expect(res.status).toBe(200);
    });

    it('should return 403 for student role accessing another student', async () => {
      const studentId = 1; // Assuming this ID exists

      const res = await request(app)
        .get(`/api/students/${studentId}`)
        .set('Authorization', `Bearer ${studentToken}`);

      expect(res.status).toBe(403);
    });

    it('should return 404 if student not found', async () => {
        const nonExistentStudentId = 999; // Use a student ID that doesn't exist
        const res = await request(app)
          .get(`/api/students/${nonExistentStudentId}`)
          .set('Authorization', `Bearer ${deptHeadToken}`);
      
        expect(res.status).toBe(404);
        expect(res.body.error).toBe('Student not found');
      });

      it('should return 403 if student tries to access another student\'s data', async () => {
        const anotherStudentId = 2; // Replace with an actual student ID
        const res = await request(app)
          .get(`/api/students/${anotherStudentId}`)
          .set('Authorization', `Bearer ${studentToken}`);
      
        expect(res.status).toBe(403);
        expect(res.body.error).toBe('Forbidden: You can only access your own data');
      });
      
      
  });

  describe('PUT /api/students/:id', () => {
    it('should allow registrar to update student information', async () => {
      const updatedData = {
        first_name: 'Jane',
        middle_name: 'Doe',
        last_name: 'Smith',
        contact_number: '987-654-3210',
        address: '456 Elm St',
        date_of_birth: '2000-12-31',
        student_type: 'Regular',
        standing_year: 2,
        semester: '2nd',
        program_id: 1,
        password: '456',
      };

      const res = await request(app)
        .put(`/api/students/${createdStudentId}`)
        .send(updatedData)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(200);
      console.log('Updated student:', JSON.stringify(res.body, null, 2));
    });
  });

  describe('DELETE /api/students/:id', () => {
    it('should allow registrar to delete student', async () => {
      const res = await request(app)
        .delete(`/api/students/${createdStudentId}`)
        .set('Authorization', `Bearer ${registrarToken}`);

      expect(res.status).toBe(200);
    });

    it('should return 403 for department_head role trying to delete student', async () => {
      const res = await request(app)
        .delete(`/api/students/${createdStudentId}`)
        .set('Authorization', `Bearer ${deptHeadToken}`);

      expect(res.status).toBe(403);
    });
  });
});
>>>>>>> 2c49dd1599ede43207e18f9462af3dd820564bbe
