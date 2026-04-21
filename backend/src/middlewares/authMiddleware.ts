import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface JwtPayload {
  id: string;
  role: 'user' | 'cs' | 'admin';
}

// Extend the Express Request interface globally
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    const secret = process.env.JWT_SECRET || 'csc_secret_key';

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(403).json({ status: 'error', message: 'Forbidden: Invalid or expired token' });
      }

      req.user = decoded as JwtPayload;
      next();
    });
  } else {
    return res.status(401).json({ status: 'error', message: 'Unauthorized: No token provided' });
  }
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized: No user session found' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ status: 'error', message: 'Forbidden: Insufficient role permissions' });
    }

    next();
  };
};
