import { Router } from 'express';
import { getDailyRevenue, getRevenueByCourt } from '../controllers/reportController';
import { authenticateJWT, authorizeRoles } from '../middlewares/authMiddleware';

const router = Router();

// Secure all reporting endpoints globally: Only 'admin' can access financial data
router.use(authenticateJWT, authorizeRoles('admin'));

router.get('/daily', getDailyRevenue);
router.get('/by-court', getRevenueByCourt);

export default router;
