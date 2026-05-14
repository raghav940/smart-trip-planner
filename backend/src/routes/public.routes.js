import { Router } from 'express';

const router = Router();

router.get('/features', (req, res) => {
  res.json({
    features: [
      'Open-source travel planning',
      'Self-hosted AI itinerary generation',
      'OpenStreetMap and Open-Meteo integrations',
      'Protected dashboard and trip management',
    ],
  });
});

export default router;