'use server';

import { fetchApi } from '@/utils/fetch';

export const fetchEvents = async () => {
  try {
    const response = await fetchApi({
      apiVersion: '/api/v1/',
      endpoint: 'get-calendar-events',
      method: 'POST',
    });

    return response;
  } catch (error: any) {
    console.error('Error fetching calendar events:', error.message);
    throw error;
  }
};
