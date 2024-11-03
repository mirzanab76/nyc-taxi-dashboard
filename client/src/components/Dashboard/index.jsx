import { useState } from 'react';
import Map from '../Map';
import Filters from '../Filters';
import TripDetails from '../TripDetails';
import { useTrips } from '../../hooks/useTrips';

const Dashboard = () => {
  const [filters, setFilters] = useState({
    dateRange: [new Date('2014-01-01'), new Date('2014-01-02')],
    fareRange: [0, 100],
    distanceRange: [0, 50],
    paymentType: 'all'
  });

  const { data, isLoading, error } = useTrips(filters);
  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading trip data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-2xl w-full mx-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error loading data
              </h3>
              <p className="mt-2 text-sm text-red-700">
                {error.message}
              </p>
              <p className="mt-3">
                <button
                  onClick={() => window.location.reload()}
                  className="bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600"
                >
                  Try Again
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const trips = data?.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 relative z-20">
          <Filters filters={filters} onFilterChange={setFilters} />
        </div>
        
        <div className="lg:col-span-3 space-y-6 relative z-10">
          <Map trips={data?.data || []} isLoading={isLoading} />
          <TripDetails trips={data?.data || []} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;