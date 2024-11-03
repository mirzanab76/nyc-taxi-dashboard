import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency, formatDistance } from '../../utils/formatters';

const TripDetails = ({ trips, isLoading }) => {
  const stats = useMemo(() => {
    if (!trips.length) return null;

    const totalFare = trips.reduce((sum, trip) => sum + Number(trip.fare_amount), 0);
    const totalDistance = trips.reduce((sum, trip) => sum + Number(trip.trip_distance), 0);
    
    const hourlyData = trips.reduce((acc, trip) => {
      const hour = new Date(trip.pickup_datetime).getHours();
      if (!acc[hour]) {
        acc[hour] = { hour, count: 0, totalFare: 0 };
      }
      acc[hour].count += 1;
      acc[hour].totalFare += Number(trip.fare_amount);
      return acc;
    }, {});

    const hourlyStats = Object.values(hourlyData).map(stat => ({
      ...stat,
      averageFare: stat.totalFare / stat.count
    }));

    return {
      tripCount: trips.length,
      averageFare: totalFare / trips.length,
      averageDistance: totalDistance / trips.length,
      hourlyStats: hourlyStats.sort((a, b) => a.hour - b.hour)
    };
  }, [trips]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4">
        Loading trip details...
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4">
        No trip data available.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold mb-6">Trip Analysis</h2>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800">Total Trips</h3>
          <p className="text-2xl font-bold text-blue-900">{stats.tripCount}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-green-800">Average Fare</h3>
          <p className="text-2xl font-bold text-green-900">
            {formatCurrency(stats.averageFare)}
          </p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-purple-800">Average Distance</h3>
          <p className="text-2xl font-bold text-purple-900">
            {formatDistance(stats.averageDistance)}
          </p>
        </div>
      </div>

      {/* Hourly Distribution Chart */}
      <div className="mt-8">
        <h3 className="text-md font-semibold mb-4">Hourly Trip Distribution</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.hourlyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="count" fill="#3b82f6" name="Trip Count" />
              <Bar yAxisId="right" dataKey="averageFare" fill="#10b981" name="Avg Fare ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;