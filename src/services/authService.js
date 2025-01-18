import jwt from 'jsonwebtoken';
import { DepartmentHeadRepository } from '../repositories/departmentHeadRepository.js';
import { RegistrarHeadRepository } from '../repositories/registrarHeadRepository.js'; // Example additional repository
import { StudentRepository } from '../repositories/studentRepository.js';
import { AdviserRepository } from '../repositories/adviserRepository.js'

import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

let blacklistedTokens = [];  // Store blacklisted tokens (in-memory)

// Map roles to their corresponding repositories
const roleRepositories = {
  department_head: new DepartmentHeadRepository(),
  registrar: new RegistrarHeadRepository(), // Example additional role
  student: new StudentRepository(), 
  adviser: new AdviserRepository()
};

// Login User Function
export const loginUser = async (email, password, role) => {
  console.log('loginUser triggered for role:', role);

  // Check if the role is valid
  const repository = roleRepositories[role];
  if (!repository) {
    console.error(`Role "${role}" not found in roleRepositories.`);
    throw new Error('Invalid role');
  }

  // Check if the user exists
  const user = await repository.getByEmail(email);
  console.log(user);

  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Verify the password
  const isPasswordCorrect = await repository.verifyPassword(user, password);
  if (!isPasswordCorrect) {
    throw new Error('Invalid credentials');
  }

  // Generate JWT
  const token = jwt.sign(
    { id: user.id, role }, // Include role in the payload
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return { token, user };
};

// Generate JWT Token
export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
};

// Verify JWT Token and Check Blacklist
export const verifyToken = (token) => {
  try {
    // Check if the token is blacklisted
    if (blacklistedTokens.includes(token)) {
      throw new Error('Token is blacklisted');
    }
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Error('Invalid token');
  }
};

// Blacklist the Token (Log Out)
export const blacklistToken = (token) => {
  blacklistedTokens.push(token); // Add token to blacklist
};

// Optional: Clear expired tokens from the blacklist
export const clearExpiredTokens = () => {
  const now = Date.now();
  blacklistedTokens = blacklistedTokens.filter((token) => {
    const decoded = jwt.decode(token);
    return decoded.exp * 1000 > now; // Remove expired tokens
  });
};

// Example of Logging out (Blacklisting Token)
export const logoutUser = (token) => {
  blacklistToken(token); // Blacklist the token when the user logs out
  console.log(`Token blacklisted: ${token}`);
};
