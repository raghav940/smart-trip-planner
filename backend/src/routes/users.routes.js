import { Router } from 'express';
import { authGuard } from '../middleware/auth-guard.js';
import { getCurrentUser } from '../services/auth.service.js';

const router = Router();

router.get('/me', authGuard, async (req, res, next) => {
  try {
    const user = await getCurrentUser(req.auth.userId);
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
});

export default router;