import { useQuery } from 'react-query';
import { fetchTrips } from '../services/api';

export const useTrips = (filters) => {
  return useQuery(
    ['trips', filters],
    () => fetchTrips(filters),
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );
};