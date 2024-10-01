import { create } from 'zustand';

type typeLatLng = {
  lat: number;
  lng: number;
};

interface Props {
  LatLng: typeLatLng | null;
  setLatLng: () => Promise<typeLatLng>;
}

export const useMyPositionStore = create<Props>(set => ({
  LatLng: null,

  setLatLng: () => {
    return new Promise<typeLatLng>((resolve, reject) => {
      navigator.geolocation.watchPosition(
        position => {
          const { latitude, longitude } = position.coords;
          const returnLatLng: typeLatLng = {
            lat: latitude,
            lng: longitude,
          };

          set(() => ({
            LatLng: returnLatLng,
          }));

          resolve(returnLatLng);
        },
        error => {
          console.error('Geolocation error:', error);
          reject(error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 30000,
          timeout: 27000,
        }
      );
    });
  },
}));
