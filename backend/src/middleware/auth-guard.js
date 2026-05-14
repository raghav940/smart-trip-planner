import { HttpError } from '../utils/http-error.js';
import { verifyToken } from '../utils/jwt.js';
import env from '../config/env.js';

export function authGuard(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new HttpError(401, 'Authorization token is required'));
  }

  const token = authHeader.slice('Bearer '.length);

  try {
    const payload = verifyToken(token, env.jwtSecret);
    req.auth = {
      userId: payload.sub,
      role: payload.role,
    };
  } catch {
    return next(new HttpError(401, 'Invalid authorization token'));
  }

  next();
}