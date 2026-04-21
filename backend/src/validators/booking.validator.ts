import { z } from 'zod';

export const createBookingSchema = z.object({
  body: z.object({
    court_id: z.number().int().positive('court_id must be a positive integer'),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
    start_time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'start_time must be in HH:MM format'),
    duration: z.number().int().min(1, 'Duration must be at least 1 hour'),
    customer_name: z.string().optional(),
    phone: z.string().optional(),
  }),
});

export const getAvailabilitySchema = z.object({
  query: z.object({
    court_id: z.string().transform((val) => parseInt(val, 10)).refine((val) => !isNaN(val), 'court_id must be a valid number'),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  }),
});
