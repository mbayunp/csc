import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'sequelize';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled Error:', err);

  const statusCode = err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === 'production';

  // Handle Sequelize validation errors cleanly
  if (err instanceof ValidationError) {
    const messages = err.errors.map(e => e.message);
    return res.status(400).json({
      status: 'error',
      message: 'Database Validation Error',
      errors: messages,
    });
  }

  // Generic Error formatting
  return res.status(statusCode).json({
    status: 'error',
    message: isProduction && statusCode === 500 ? 'Internal Server Error' : err.message || 'An unexpected error occurred',
    ...(isProduction ? {} : { stack: err.stack }), // Safe stack exposure based on environment
  });
};
