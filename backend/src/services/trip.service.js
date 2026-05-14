import prisma from '../lib/prisma.js';
import { HttpError } from '../utils/http-error.js';

function parseTripInput(input) {
  const title = String(input.title || '').trim();
  const destination = String(input.destination || '').trim();
  const startDate = input.startDate ? new Date(input.startDate) : null;
  const endDate = input.endDate ? new Date(input.endDate) : null;
  const budget = input.budget === '' || input.budget === undefined || input.budget === null
    ? null
    : Number(input.budget);
  const travelers = input.travelers === '' || input.travelers === undefined || input.travelers === null
    ? 1
    : Number(input.travelers);

  if (!title || !destination || !startDate || !endDate) {
    throw new HttpError(400, 'Title, destination, start date, and end date are required');
  }

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    throw new HttpError(400, 'Start date and end date must be valid dates');
  }

  if (endDate < startDate) {
    throw new HttpError(400, 'End date must be on or after start date');
  }

  if (budget !== null && Number.isNaN(budget)) {
    throw new HttpError(400, 'Budget must be a valid number');
  }

  if (Number.isNaN(travelers) || travelers < 1) {
    throw new HttpError(400, 'Travelers must be at least 1');
  }

  return {
    title,
    destination,
    startDate,
    endDate,
    budget,
    travelers,
  };
}

function ensureOwnership(trip, userId) {
  if (!trip) {
    throw new HttpError(404, 'Trip not found');
  }

  if (trip.ownerId !== userId) {
    throw new HttpError(403, 'You do not have access to this trip');
  }
}

function formatTrip(trip) {
  return {
    id: trip.id,
    title: trip.title,
    destination: trip.destination,
    startDate: trip.startDate,
    endDate: trip.endDate,
    budget: trip.budget,
    travelers: trip.travelers,
    ownerId: trip.ownerId,
    createdAt: trip.createdAt,
    updatedAt: trip.updatedAt,
  };
}

export async function listTrips(userId) {
  const trips = await prisma.trip.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: 'desc' },
  });

  return trips.map(formatTrip);
}

export async function createTrip(userId, input) {
  const data = parseTripInput(input);

  const trip = await prisma.trip.create({
    data: {
      ...data,
      ownerId: userId,
    },
  });

  return formatTrip(trip);
}

export async function getTrip(userId, tripId) {
  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
  });

  ensureOwnership(trip, userId);

  return formatTrip(trip);
}

export async function updateTrip(userId, tripId, input) {
  const existingTrip = await prisma.trip.findUnique({
    where: { id: tripId },
  });

  ensureOwnership(existingTrip, userId);

  const data = parseTripInput({
    title: input.title ?? existingTrip.title,
    destination: input.destination ?? existingTrip.destination,
    startDate: input.startDate ?? existingTrip.startDate,
    endDate: input.endDate ?? existingTrip.endDate,
    budget: input.budget === undefined ? existingTrip.budget : input.budget,
    travelers: input.travelers === undefined ? existingTrip.travelers : input.travelers,
  });

  const trip = await prisma.trip.update({
    where: { id: tripId },
    data,
  });

  return formatTrip(trip);
}

export async function deleteTrip(userId, tripId) {
  const existingTrip = await prisma.trip.findUnique({
    where: { id: tripId },
  });

  ensureOwnership(existingTrip, userId);

  await prisma.trip.delete({
    where: { id: tripId },
  });

  return { message: 'Trip deleted' };
}