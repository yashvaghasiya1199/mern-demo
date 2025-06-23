import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

// Define a type for location coordinates
interface ICoordinates {
  lat: number;
  lng: number;
}

export const Map = () => {
  const [userLocation, setUserLocation] = useState<ICoordinates | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCuGCIzMoGroJFKhQGYzvQ9DLumhHMesBE',
  });

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position: GeolocationPosition) => {
          setUserLocation({
            lat: 21.424757, // Static for now
            lng: 72.107018,
            // lat: position.coords.latitude,
            // lng: position.coords.longitude,
          });
        },
        (error: GeolocationPositionError) => {
          console.error('Error watching location:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );

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
