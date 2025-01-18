import request from 'supertest';
import app from '../src/app';

const loginUser = async (email, password, role) => {
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email, password, role });

  if (res.status !== 200) {
    throw new Error(`Login failed for ${email} with role ${role}: ${res.body.message}`);
  }
  return res.body.token;
};

describe('Auth Routes', () => {
  const testData = [
    { email: "regis.regis@cvsu.ph.com", password: "regis", role: "registrar" },
    { email: "dept.dept@cvsu.ph.com", password: "dept", role: "department_head" },
    { email: "stud.stud@cvsu.ph.com", password: "stud", role: "student" },
    { email: "advadv.adv@cvsu.edu.ph", password: "adv", role: "adviser" },
  ];

  describe('POST /api/auth/login', () => {
    testData.forEach(({ email, password, role }) => {
      it(`should log in ${role} successfully`, async () => {
        const response = await request(app)
          .post('/api/auth/login')
          .send({ email, password, role });
        
        console.log(response.body);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
      });
    });

    it('should return 400 for invalid credentials', async () => {
        const response = await request(app)
          .post('/api/auth/login')
          .send({ email: 'wrong.email@domain.com', password: 'wrongpassword', role: 'student' });
      
        expect(response.statusCode).toBe(400); // This ensures that the status code is 400
        expect(response.body).toHaveProperty('error', 'Invalid credentials'); // Match the 'error' property instead of 'message'
      });
      

    it('should return 400 for missing fields', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'stud.stud@cvsu.ph.com' });

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: 'Invalid role' });
    });
  });

  describe('POST /api/auth/logout', () => {
    testData.forEach(({ email, password, role }) => {
      it(`should log out ${role} successfully`, async () => {
        // Login first to get a token
        const token = await loginUser(email, password, role);

        const response = await request(app)
          .post('/api/auth/logout')
          .set('Authorization', `Bearer ${token}`)
          .send();

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Logged out successfully');
      });
    });
  });
});
