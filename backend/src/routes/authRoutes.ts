import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { validate } from '../middlewares/validate';
import { registerSchema, loginSchema } from '../validators/auth.validator';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

// Dummy endpoint to test token validity and extraction
router.get('/me', authenticateJWT, (req, res) => {
  return res.status(200).json({
    status: 'success',
    data: req.user,
  });
});

export default router;
