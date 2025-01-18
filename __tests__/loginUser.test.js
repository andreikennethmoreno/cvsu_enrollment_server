import { loginUser, logoutUser } from '../src/services/authService.js'; 
import jwt from 'jsonwebtoken';
import { DepartmentHeadRepository } from '../src/repositories/departmentHeadRepository.js';
import { RegistrarHeadRepository } from '../src/repositories/registrarHeadRepository.js';
import dotenv from 'dotenv';
import request from 'supertest';
import express from 'express';

dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON in the body

// Route Handlers
const login = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const { token, user } = await loginUser(email, password, role);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logout = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(400).json({ error: 'No token provided' });
  }
  logoutUser(token);
  res.status(200).json({ message: 'Logged out successfully' });
};

// Simple route setup for login and logout
app.post('/login', login);
app.post('/logout', logout);

// Tests
describe('Authentication and Route Handlers', () => {
  it('should login a department head and return a token', async () => {
    const email = 'dept.dept@cvsu.ph.com';
    const password = 'dept';
    const role = 'department_head';

    const user = {
      id: 36,
      first_name: 'dept',
      middle_name: 'dept',
      last_name: 'dept',
      email: email,
      password: '$2b$10$apFWOcCYfpPoX.yZik2hf.WlTjYzPxn6P/Gy1kXiSNSdnEzPXWgSu',
      program_id: 1
    };

    const departmentHeadRepository = new DepartmentHeadRepository();
    departmentHeadRepository.getByEmail = jest.fn().mockResolvedValue(user);
    departmentHeadRepository.verifyPassword = jest.fn().mockResolvedValue(true);

    const response = await request(app)
      .post('/login')
      .send({ email, password, role })
      .expect(200);

    expect(response.body).toHaveProperty('token');
    expect(response.body.user).toEqual(user);
  });

  it('should throw error if user is not found during login', async () => {
    const email = 'unknown@cvsu.ph.com';
    const password = 'wrongpassword';
    const role = 'department_head';

    const departmentHeadRepository = new DepartmentHeadRepository();
    departmentHeadRepository.getByEmail = jest.fn().mockResolvedValue(null);

    const response = await request(app)
      .post('/login')
      .send({ email, password, role })
      .expect(400);

    expect(response.body.error).toBe('Invalid credentials');
  });

  it('should throw error if password is incorrect during login', async () => {
    const email = 'dept.dept@cvsu.ph.com';
    const password = 'wrongpassword';
    const role = 'department_head';

    const user = { id: 36, email: email };
    const departmentHeadRepository = new DepartmentHeadRepository();
    departmentHeadRepository.getByEmail = jest.fn().mockResolvedValue(user);
    departmentHeadRepository.verifyPassword = jest.fn().mockResolvedValue(false);

    const response = await request(app)
      .post('/login')
      .send({ email, password, role })
      .expect(400);

    expect(response.body.error).toBe('Invalid credentials');
  });

  it('should throw error if role is invalid during login', async () => {
    const email = 'dept.dept@cvsu.ph.com';
    const password = 'dept';
    const role = 'invalid_role';

    const response = await request(app)
      .post('/login')
      .send({ email, password, role })
      .expect(400);

    expect(response.body.error).toBe('Invalid role');
  });

  it('should log out a user and blacklist the token', async () => {
    const token = jwt.sign({ id: 1, role: 'department_head' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const response = await request(app)
      .post('/logout')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body.message).toBe('Logged out successfully');
  });

  it('should return error if no token is provided during logout', async () => {
    const response = await request(app)
      .post('/logout')
      .expect(400);

    expect(response.body.error).toBe('No token provided');
  });
});

// Actual service and repository code
describe('loginUser', () => {
  it('should login a department head and return a token', async () => {
    const email = 'dept.dept@cvsu.ph.com';
    const password = 'dept';
    const role = 'department_head';

    const user = {
      id: 36,
      first_name: 'dept',
      middle_name: 'dept',
      last_name: 'dept',
      email: email,
      password: '$2b$10$apFWOcCYfpPoX.yZik2hf.WlTjYzPxn6P/Gy1kXiSNSdnEzPXWgSu',
      program_id: 1
    };

    const departmentHeadRepository = new DepartmentHeadRepository();
    departmentHeadRepository.getByEmail = jest.fn().mockResolvedValue(user);
    departmentHeadRepository.verifyPassword = jest.fn().mockResolvedValue(true);

    const response = await loginUser(email, password, role);

    expect(response).toHaveProperty('token');
    expect(response.token).toBeDefined();
    expect(response.user).toEqual(user);
  });

  it('should throw error if user is not found', async () => {
    const email = 'unknown@cvsu.ph.com';
    const password = 'wrongpassword';
    const role = 'department_head';

    const departmentHeadRepository = new DepartmentHeadRepository();
    departmentHeadRepository.getByEmail = jest.fn().mockResolvedValue(null);

    await expect(loginUser(email, password, role)).rejects.toThrow('Invalid credentials');
  });

  it('should throw error if password is incorrect', async () => {
    const email = 'dept.dept@cvsu.ph.com';
    const password = 'wrongpassword';
    const role = 'department_head';

    const user = { id: 36, email: email };
    const departmentHeadRepository = new DepartmentHeadRepository();
    departmentHeadRepository.getByEmail = jest.fn().mockResolvedValue(user);
    departmentHeadRepository.verifyPassword = jest.fn().mockResolvedValue(false);

    await expect(loginUser(email, password, role)).rejects.toThrow('Invalid credentials');
  });

  it('should throw error if role is invalid', async () => {
    const email = 'dept.dept@cvsu.ph.com';
    const password = 'dept';
    const role = 'invalid_role';

    await expect(loginUser(email, password, role)).rejects.toThrow('Invalid role');
  });
});
