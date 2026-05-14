import { Router } from 'express';
import { authGuard } from '../middleware/auth-guard.js';
import { HttpError } from '../utils/http-error.js';

const router = Router();

router.use(authGuard);

router.get('/', (req, res) => {
  res.json({ trips: [] });
});

router.post('/', (req, res, next) => {
  next(new HttpError(501, 'Trip creation will be implemented in the next phase'));
});

router.get('/:tripId', (req, res, next) => {
  next(new HttpError(501, 'Trip details will be implemented in the next phase'));
});

router.put('/:tripId', (req, res, next) => {
  next(new HttpError(501, 'Trip update will be implemented in the next phase'));
});

router.delete('/:tripId', (req, res, next) => {
  next(new HttpError(501, 'Trip delete will be implemented in the next phase'));
});

export default router;