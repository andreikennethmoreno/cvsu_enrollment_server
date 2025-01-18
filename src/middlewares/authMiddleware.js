import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { verifyToken } from '../services/authService.js';


dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = verifyToken(token); // This verifies the token and checks if it's blacklisted
    req.user = decoded; // Attach user info to the request
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is invalid, expired, or blacklisted' });
  }
};



export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden: Access denied' });
    }

    // If the role is 'student', check if the student ID matches the one in the request URL
    if (req.user.role === 'student' && req.user.id !== parseInt(req.params.id)) {
      return res.status(403).json({ error: 'Forbidden: You can only access your own data' });
    }

    next();
  };
};
