import { Router } from 'express';
import { getAllCourts, createCourt, updateCourt, deleteCourt } from '../controllers/courtController';
import { authenticateJWT, authorizeRoles } from '../middlewares/authMiddleware';

const router = Router();

// Public route to get all courts
router.get(['/', ''], getAllCourts);

// Protected Admin/CS route to create a court
router.post(['/', ''], authenticateJWT, authorizeRoles('cs', 'admin'), createCourt);

// Protected Admin/CS route to update a court
router.put('/:id', authenticateJWT, authorizeRoles('cs', 'admin'), updateCourt);

// Protected Admin route to delete a court
router.delete('/:id', authenticateJWT, authorizeRoles('admin'), deleteCourt);

export default router;
