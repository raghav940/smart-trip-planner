import { Router } from 'express';
import { HttpError } from '../utils/http-error.js';
import {
  signupUser,
  loginUser,
  refreshUserToken,
  startPasswordReset,
  resetPassword,
} from '../services/auth.service.js';

const router = Router();

router.post('/signup', async (req, res, next) => {
  try {
    const user = await signupUser(req.body);
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const authResult = await loginUser(req.body);
    res.status(200).json(authResult);
  } catch (error) {
    next(error);
  }
});

router.post('/refresh', async (req, res, next) => {
  try {
    const authResult = await refreshUserToken(req.body);
    res.status(200).json(authResult);
  } catch (error) {
    next(error);
  }
});

router.post('/forgot', async (req, res, next) => {
  try {
    const result = await startPasswordReset(req.body);
    res.status(200).json({
      message: 'If the email exists, a reset token was generated',
      resetToken: result.resetToken,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/reset', async (req, res, next) => {
  try {
    const result = await resetPassword(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export default router;