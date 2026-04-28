import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-key';

// Mock user database (in production, use a real database)
const MOCK_USERS = [
  {
    id: 1,
    email: 'admin@example.com',
    password: '$2a$10$rVgV5qXKxXxXxXxXxXxXxO8qGJxL5qJxL5qJxL5qJxL5qJxL5qJxL5q', // "password123"
    name: 'Admin User',
  },
];

export async function validateUser(email: string, password: string): Promise<{ id: number; name: string; email: string } | null> {
  const user = MOCK_USERS.find(u => u.email === email);
  
  if (!user) {
    return null;
  }

  // For demo purposes, we'll accept "password123" as password
  // In production, use bcrypt.compare
  if (password !== 'password123') {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

export function generateToken(userId: number, email: string): string {
  return jwt.sign(
    { userId, email },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

export function verifyToken(token: string): { userId: number; email: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; email: string };
    return decoded;
  } catch (error) {
    return null;
  }
}