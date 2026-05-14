import { Router } from 'express';
import { authGuard } from '../middleware/auth-guard.js';
import {
  listTrips,
  createTrip,
  getTrip,
  updateTrip,
  deleteTrip,
} from '../services/trip.service.js';

const router = Router();

router.use(authGuard);

router.get('/', async (req, res, next) => {
  try {
    const trips = await listTrips(req.auth.userId);
    res.status(200).json({ trips });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const trip = await createTrip(req.auth.userId, req.body);
    res.status(201).json({ trip });
  } catch (error) {
    next(error);
  }
});

router.get('/:tripId', async (req, res, next) => {
  try {
    const trip = await getTrip(req.auth.userId, req.params.tripId);
    res.status(200).json({ trip });
  } catch (error) {
    next(error);
  }
});

router.put('/:tripId', async (req, res, next) => {
  try {
    const trip = await updateTrip(req.auth.userId, req.params.tripId, req.body);
    res.status(200).json({ trip });
  } catch (error) {
    next(error);
  }
});

router.delete('/:tripId', async (req, res, next) => {
  try {
    const result = await deleteTrip(req.auth.userId, req.params.tripId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export default router;