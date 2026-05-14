import { HttpError } from '../utils/http-error.js';

export function authGuard(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new HttpError(401, 'Authorization token is required'));
  }

  next();
}