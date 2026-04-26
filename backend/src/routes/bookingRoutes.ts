import { Router } from 'express';
import { createBooking, getAvailability, approveBooking, rejectBooking, getAllBookings, deleteBooking } from '../controllers/bookingController';
import { validate } from '../middlewares/validate';
import { createBookingSchema, getAvailabilitySchema } from '../validators/booking.validator';
import { authenticateJWT, authorizeRoles } from '../middlewares/authMiddleware';

const router = Router();

// Public / Core Routes
router.get('/availability', validate(getAvailabilitySchema), getAvailability);

// Protected User Routes
router.post(['/', ''], validate(createBookingSchema), createBooking);

// Protected CS/Admin Routes
router.get(['/', ''], authenticateJWT, authorizeRoles('cs', 'admin'), getAllBookings);
router.post(['/manual', '/manual/'], authenticateJWT, authorizeRoles('cs', 'admin'), validate(createBookingSchema), createBooking);

router.put('/:id/approve', authenticateJWT, authorizeRoles('cs', 'admin'), approveBooking);
router.put('/:id/reject', authenticateJWT, authorizeRoles('cs', 'admin'), rejectBooking);
router.delete('/:id', authenticateJWT, authorizeRoles('admin', 'cs'), deleteBooking);

export default router;
