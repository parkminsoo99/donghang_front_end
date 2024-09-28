import { useEffect, useRef, useCallback, useState } from 'react';
import {
  LatLng,
  Position,
  ZoomControlStyle,
  NaverMap,
  Marker,
} from '@/types/naverMap';

interface useNaverMapProps {
  pinArray: number[][];
  mapElement: HTMLElement;
}

export const useNaverMap = ({ pinArray, mapElement }: useNaverMapProps) => {
  const src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`;
  const markerList = [] as Marker[];
  const mapInstanceRef = useRef<NaverMap | null>(null);

  const initialNaverMapScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = src;
      script.onload = () => {
        resolve();
      };
      script.onerror = () => {
        reject(new Error('Script loading failed'));
      };
      document.head.appendChild(script);
    });
  };

  const callNaverMap = async () => {
    try {
      await initialNaverMapScript();
      initNavermap();
    } catch (error) {
      console.error('Error loading script:', error);
    }
  };

  const initNavermap = () => {
    if (typeof naver !== 'undefined' && mapElement) {
      const mapOptions = {
        center: new naver.maps.LatLng(37.5665, 126.978),
        zoom: 14,
        minZoom: 12,
        maxZoom: 17,
        zoomControl: true,
        zoomControlOptions: {
          style: naver.maps.ZoomControlStyle.LARGE,
          position: naver.maps.Position.RIGHT_CENTER,
          top: 50,
        },
        draggable: true,
      };

      const mapInstance = new naver.maps.Map(mapElement, mapOptions);
      mapInstanceRef.current = mapInstance;

      for (let i = 0; i < pinArray[0].length; i++) {
        const position = new naver.maps.LatLng(pinArray[0][i], pinArray[1][i]);
        const marker = new naver.maps.Marker({
          icon: {
            content: `
                <div class="food-pin" style="position: relative; box-sizing: border-box; width: 35px; height: 45px; display: flex; flex-direction: row;">
                  <img 
                    src="/images/meatPin.png" 
                    style="z-index: 1; width: 35px; height: 45px;" 
                    alt="Picture of the author" 
                  />
                  <div style="border-radius: 30px; background-color: #ffaaa4; width: 25px; height: 25px; display: flex; justify-content: center; color: #fff; align-items: center; position: absolute; top: -13px; right: -13px; z-index: 999; font-size:13px">
                    ${pinArray[2][i]}
                  </div>
                </div>
              `,
          },
          position: position,
          map: mapInstance,
        });
        markerList.push(marker);
      }
    } else {
      console.log('NAVER Maps is not defined');
    }
  };

  useEffect(() => {
    if (typeof naver === 'undefined') {
      callNaverMap();
    } else {
      initNavermap();
    }
  }, [pinArray]);

  return { markerList, callNaverMap, mapInstanceRef };
};
