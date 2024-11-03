import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';

const Map = ({ trips, isLoading }) => {
  const [center] = useState([40.7128, -74.0060]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Trip Map</h2>
      <div className="h-[500px] w-full relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            Loading map...
          </div>
        ) : (
          <MapContainer
            center={center}
            zoom={11}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            {trips.map((trip, index) => (
              <Marker
                key={index}
                position={[trip.pickup_latitude, trip.pickup_longitude]}
              >
                <Popup>
                  <div>
                    <p>Fare: ${trip.fare_amount}</p>
                    <p>Distance: {trip.trip_distance} miles</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default Map;