import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const formatDateParam = (date) => {
  if (!date) return null;
  return new Date(date).toISOString();
};

export const fetchTrips = async (filters) => {
  try {
    const params = {};

    if (filters.dateRange?.[0] && filters.dateRange?.[1]) {
      params.startDate = formatDateParam(filters.dateRange[0]);
      params.endDate = formatDateParam(filters.dateRange[1]);
    }

    if (filters.fareRange) {
      params.minFare = filters.fareRange[0];
      params.maxFare = filters.fareRange[1];
    }

    if (filters.distanceRange) {
      params.minDistance = filters.distanceRange[0];
      params.maxDistance = filters.distanceRange[1];
    }

    if (filters.paymentType && filters.paymentType !== 'all') {
      params.paymentType = filters.paymentType;
    }

    console.log('Sending request with params:', params);

    const response = await axios.get(`${API_BASE_URL}/trips`, {
      params,
      headers: {
        'Accept': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch trip data');
  }
};