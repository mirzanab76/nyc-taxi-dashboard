import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const DATASET_ID = 'gkne-dk5s';
const BASE_URL = `https://data.cityofnewyork.us/resource/${DATASET_ID}.json`;

const formatDateForSocrata = (dateString) => {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    return date.toISOString().split('.')[0];
  } catch (error) {
    console.error('Date formatting error:', error);
    return null;
  }
};

export const getTaxiData = async (filters = {}) => {
  try {
    console.log('Received filters:', filters); 

    const params = new URLSearchParams();
    
    params.append('$limit', '1000');

    let whereConditions = [];

    if (filters.startDate && filters.endDate) {
      const start = formatDateForSocrata(filters.startDate);
      const end = formatDateForSocrata(filters.endDate);
      
      if (start && end) {
        whereConditions.push(`pickup_datetime >= '${start}' AND pickup_datetime <= '${end}'`);
      }
    }

    if (filters.minFare !== undefined || filters.maxFare !== undefined) {
      if (filters.minFare !== undefined) {
        whereConditions.push(`fare_amount >= ${filters.minFare}`);
      }
      if (filters.maxFare !== undefined) {
        whereConditions.push(`fare_amount <= ${filters.maxFare}`);
      }
    }

    if (filters.minDistance !== undefined || filters.maxDistance !== undefined) {
      if (filters.minDistance !== undefined) {
        whereConditions.push(`trip_distance >= ${filters.minDistance}`);
      }
      if (filters.maxDistance !== undefined) {
        whereConditions.push(`trip_distance <= ${filters.maxDistance}`);
      }
    }

    if (filters.paymentType && filters.paymentType !== 'all') {
      whereConditions.push(`payment_type = '${filters.paymentType}'`);
    }

    if (whereConditions.length > 0) {
      params.append('$where', whereConditions.join(' AND '));
    }

    params.append('$select', 'pickup_datetime, dropoff_datetime, pickup_latitude, pickup_longitude, dropoff_latitude, dropoff_longitude, trip_distance, fare_amount, payment_type');

    params.append('$order', 'pickup_datetime DESC');

    console.log('Final URL:', `${BASE_URL}?${params.toString()}`); // Debug log

    const response = await axios.get(BASE_URL, { 
      params: params,
      headers: {
        'Accept': 'application/json'
      }
    });

    return response.data;
    
  } catch (error) {
    console.error('Socrata API Error:', error.response?.data || error.message);
    throw new Error('Failed to fetch data from Socrata API');
  }
};