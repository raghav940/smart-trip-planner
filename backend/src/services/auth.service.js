import prisma from '../lib/prisma.js';
import { HttpError } from '../utils/http-error.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateToken, hashToken } from '../utils/token.js';
import { signAccessToken, signRefreshToken, verifyToken } from '../utils/jwt.js';
import env from '../config/env.js';

function sanitizeUser(user) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function signupUser({ email, password, name }) {
  const normalizedEmail = String(email || '').trim().toLowerCase();

  if (!normalizedEmail || !password) {
    throw new HttpError(400, 'Email and password are required');
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (existingUser) {
    throw new HttpError(409, 'User already exists');
  }

  const user = await prisma.user.create({
    data: {
      email: normalizedEmail,
      password: await hashPassword(password),
      name: name || null,
    },
  });

  return sanitizeUser(user);
}

export async function loginUser({ email, password }) {
  const normalizedEmail = String(email || '').trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    throw new HttpError(401, 'Invalid email or password');
  }

  const passwordMatches = await comparePassword(password, user.password);

  if (!passwordMatches) {
    throw new HttpError(401, 'Invalid email or password');
  }

  const payload = { sub: user.id, role: user.role };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);
  const refreshTokenHash = hashToken(refreshToken);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshTokenHash },
  });

  return {
    accessToken,
    refreshToken,
    user: sanitizeUser(user),
  };
}

export async function refreshUserToken({ refreshToken }) {
  if (!refreshToken) {
    throw new HttpError(400, 'Refresh token is required');
  }

  let payload;

  try {
    payload = verifyToken(refreshToken, env.jwtRefreshSecret);
  } catch {
    throw new HttpError(401, 'Invalid refresh token');
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
  });

  if (!user || user.refreshTokenHash !== hashToken(refreshToken)) {
    throw new HttpError(401, 'Invalid refresh token');
  }

  const nextPayload = { sub: user.id, role: user.role };
  const accessToken = signAccessToken(nextPayload);
  const nextRefreshToken = signRefreshToken(nextPayload);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      refreshTokenHash: hashToken(nextRefreshToken),
    },
  });

  return {
    accessToken,
    refreshToken: nextRefreshToken,
    user: sanitizeUser(user),
  };
}

export async function startPasswordReset({ email }) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });

  if (!user) {
    return { resetToken: null };
  }

  const resetToken = generateToken();
  const resetTokenHash = hashToken(resetToken);
  const expiresInMinutes = Number(process.env.PASSWORD_RESET_EXPIRES_IN_MINUTES || 30);
  const passwordResetExpiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordResetTokenHash: resetTokenHash,
      passwordResetExpiresAt,
    },
  });

  return { resetToken };
}

export async function resetPassword({ token, password }) {
  if (!token || !password) {
    throw new HttpError(400, 'Reset token and new password are required');
  }

  const passwordResetTokenHash = hashToken(token);

  const user = await prisma.user.findFirst({
    where: {
      passwordResetTokenHash,
      passwordResetExpiresAt: {
        gt: new Date(),
      },
    },
  });

  if (!user) {
    throw new HttpError(400, 'Invalid or expired reset token');
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: await hashPassword(password),
      passwordResetTokenHash: null,
      passwordResetExpiresAt: null,
      refreshTokenHash: null,
    },
  });

  return { message: 'Password updated' };
}

export async function getCurrentUser(userId) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  return sanitizeUser(user);
}