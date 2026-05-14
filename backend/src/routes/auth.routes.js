import { Router } from 'express';
import { HttpError } from '../utils/http-error.js';

const router = Router();

router.post('/signup', (req, res, next) => {
  next(new HttpError(501, 'Signup flow will be implemented in the next phase'));
});

router.post('/login', (req, res, next) => {
  next(new HttpError(501, 'Login flow will be implemented in the next phase'));
});

router.post('/forgot', (req, res, next) => {
  next(new HttpError(501, 'Password reset flow will be implemented in the next phase'));
});

router.post('/reset', (req, res, next) => {
  next(new HttpError(501, 'Password reset flow will be implemented in the next phase'));
});

export default router;