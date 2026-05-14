import { Router } from 'express';
import healthRoutes from './health.routes.js';
import publicRoutes from './public.routes.js';
import authRoutes from './auth.routes.js';
import usersRoutes from './users.routes.js';
import tripRoutes from './trips.routes.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/public', publicRoutes);
router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/trips', tripRoutes);

export default router;