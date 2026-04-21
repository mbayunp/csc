import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodSchema } from 'zod'; // Menggunakan ZodSchema yang lebih universal

export const validate = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: error.issues,
        });
      }
      return next(error);
    }
  };
};