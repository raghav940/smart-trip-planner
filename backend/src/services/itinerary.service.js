import prisma from '../lib/prisma.js';
import { HttpError } from '../utils/http-error.js';

function ensureTripOwnership(trip, userId) {
  if (!trip) {
    throw new HttpError(404, 'Trip not found');
  }

  if (trip.ownerId !== userId) {
    throw new HttpError(403, 'You do not have access to this trip');
  }
}

function formatDay(day) {
  return {
    id: day.id,
    itineraryId: day.itineraryId,
    dayIndex: day.dayIndex,
    date: day.date,
    activities: day.activities,
  };
}

function parseDate(value, message) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new HttpError(400, message);
  }

  return date;
}

function parseActivities(value) {
  if (value === undefined || value === null) {
    return [];
  }

  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      throw new HttpError(400, 'Activities must be valid JSON');
    }
  }

  return value;
}

async function getOwnedTrip(userId, tripId) {
  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
    include: {
      itinerary: {
        include: {
          days: {
            orderBy: { dayIndex: 'asc' },
          },
        },
      },
    },
  });

  ensureTripOwnership(trip, userId);

  return trip;
}

async function ensureItinerary(tripId) {
  const itinerary = await prisma.itinerary.upsert({
    where: { tripId },
    update: {},
    create: {
      tripId,
    },
    include: {
      days: {
        orderBy: { dayIndex: 'asc' },
      },
    },
  });

  return itinerary;
}

export async function listItineraryDays(userId, tripId) {
  const trip = await getOwnedTrip(userId, tripId);

  if (!trip.itinerary) {
    return [];
  }

  return trip.itinerary.days.map(formatDay);
}

export async function createItineraryDay(userId, tripId, input) {
  const trip = await getOwnedTrip(userId, tripId);
  const itinerary = await ensureItinerary(trip.id);

  const dayIndex = Number(input.dayIndex);
  const date = parseDate(input.date, 'Day date must be a valid date');
  const activities = parseActivities(input.activities);

  if (!Number.isInteger(dayIndex) || dayIndex < 1) {
    throw new HttpError(400, 'Day index must be a positive integer');
  }

  const day = await prisma.itineraryDay.create({
    data: {
      itineraryId: itinerary.id,
      dayIndex,
      date,
      activities,
    },
  });

  return formatDay(day);
}

export async function updateItineraryDay(userId, tripId, dayId, input) {
  const trip = await getOwnedTrip(userId, tripId);
  if (!trip.itinerary) {
    throw new HttpError(404, 'Itinerary not found');
  }

  const existingDay = await prisma.itineraryDay.findFirst({
    where: {
      id: dayId,
      itineraryId: trip.itinerary.id,
    },
  });

  if (!existingDay) {
    throw new HttpError(404, 'Itinerary day not found');
  }

  const dayIndex = input.dayIndex === undefined ? existingDay.dayIndex : Number(input.dayIndex);
  const date = input.date === undefined ? existingDay.date : parseDate(input.date, 'Day date must be a valid date');
  const activities = input.activities === undefined ? existingDay.activities : parseActivities(input.activities);

  if (!Number.isInteger(dayIndex) || dayIndex < 1) {
    throw new HttpError(400, 'Day index must be a positive integer');
  }

  const day = await prisma.itineraryDay.update({
    where: { id: dayId },
    data: {
      dayIndex,
      date,
      activities,
    },
  });

  return formatDay(day);
}

export async function deleteItineraryDay(userId, tripId, dayId) {
  const trip = await getOwnedTrip(userId, tripId);

  if (!trip.itinerary) {
    throw new HttpError(404, 'Itinerary not found');
  }

  const existingDay = await prisma.itineraryDay.findFirst({
    where: {
      id: dayId,
      itineraryId: trip.itinerary.id,
    },
  });

  if (!existingDay) {
    throw new HttpError(404, 'Itinerary day not found');
  }

  await prisma.itineraryDay.delete({
    where: { id: dayId },
  });

  return { message: 'Itinerary day deleted' };
}