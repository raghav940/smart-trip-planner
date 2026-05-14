import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'smart-trip-planner-backend',
    uptime: process.uptime(),
  });
});

export default router;