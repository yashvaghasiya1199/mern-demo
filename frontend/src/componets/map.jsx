import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

export const Map = () => {
  const [userLocation, setUserLocation] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCuGCIzMoGroJFKhQGYzvQ9DLumhHMesBE',
  });

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation({
            // lat: position.coords.latitude,
            // lng: position.coords.longitude,
            lat:21.424757,
            lng:72.107018 

          });
        },
        (error) => {
          console.error('Error watching location:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );

      // Cleanup on unmount
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div>
      {userLocation ? (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={userLocation}
          zoom={15}
        >
          <Marker position={userLocation} />
        </GoogleMap>
      ) : (
        <p>Getting your location...</p>
      )}
    </div>
  );
};

