import axios from 'axios';

const API_BASE_URL = 'https://nyc-taxi-dashboard-15xqc0dg-mirzans-projects.vercel.app';

export const fetchTrips = async (filters) => {
  try {
    console.log('Fetching with filters:', filters); 

    const params = new URLSearchParams();

    if (filters.dateRange?.[0] && filters.dateRange?.[1]) {
      params.append('startDate', filters.dateRange[0].toISOString());
      params.append('endDate', filters.dateRange[1].toISOString());
    }

    if (filters.fareRange) {
      params.append('minFare', filters.fareRange[0].toString());
      params.append('maxFare', filters.fareRange[1].toString());
    }

    if (filters.distanceRange) {
      params.append('minDistance', filters.distanceRange[0].toString());
      params.append('maxDistance', filters.distanceRange[1].toString());
    }

    if (filters.paymentType && filters.paymentType !== 'all') {
      params.append('paymentType', filters.paymentType);
    }

    console.log('Request URL:', `${API_BASE_URL}/api/trips?${params.toString()}`); 

    const response = await axios.get(`${API_BASE_URL}/api/trips`, {
      params: Object.fromEntries(params),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    console.log('API Response:', response.data); 
    return response.data;
    
  } catch (error) {
    console.error('API Error Details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw new Error(error.response?.data?.message || 'Failed to fetch trip data');
  }
};