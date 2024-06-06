"use server";

import { upsertScheduler } from '../../../database/scheduler';

export async function formAction(data) {
  const result = await upsertScheduler({ cronSchedule: data.get('emailTime') });

  return {
    success: result.modifiedCount > 0 || result.upsertedCount > 0,
    message: result.modifiedCount > 0 || result.upsertedCount > 0
      ? 'Schedule updated successfully'
      : 'Failed to update schedule',
  };
}
