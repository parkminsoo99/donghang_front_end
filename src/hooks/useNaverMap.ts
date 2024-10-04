import { useEffect, useRef, useCallback, useState } from 'react';
import { LatLng, ZoomControlStyle, NaverMap, Marker } from '@/types/naverMap';
import { useMyPositionStore } from '@/zustand/MyPositionStore/myPositionStore';
import { Position } from '@/components/atomics/Icon';
import { useIsMapClick } from '@/zustand/MapClickStore/IsMapClick';
interface useNaverMapProps {
  pinArray: number[][];
  mapElement: HTMLElement;
  latlng: {
    lat: number;
    lng: number;
  };
}

export const useNaverMap = ({
  pinArray,
  mapElement,
  latlng,
}: useNaverMapProps) => {
  const src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`;
  const markerList = [] as Marker[];
  const mapInstanceRef = useRef<NaverMap | null>(null);
  const { isMapClick, setIsMapClick } = useIsMapClick();
  const { LatLng, setLatLng } = useMyPositionStore();
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
  const showMarker = (map: naver.maps.Map, marker: naver.maps.Marker) => {
    marker.setMap(map);
  };
  const hideMarker = (marker: naver.maps.Marker) => {
    marker.setMap(null);
  };
  const updateMarkers = (map: naver.maps.Map, markers: naver.maps.Marker[]) => {
    const mapBounds: any = map.getBounds();

    for (let i = 0; i < markers.length; i++) {
      const position = markers[i].getPosition();

      if (mapBounds.hasLatLng(position)) {
        console.log('showMarker');
        showMarker(map, markers[i]);
      } else {
        console.log('hideMarker');
        hideMarker(markers[i]);
      }
    }
  };

  const initNavermap = () => {
    if (typeof naver !== 'undefined' && mapElement && latlng) {
      const userLat = latlng.lat || 37.5665;
      const userLng = latlng.lng || 126.978;
      const mapOptions = {
        center: new naver.maps.LatLng(userLat, userLng),
        zoom: 14,
        minZoom: 12,
        maxZoom: 17,
        // zoomControl: true,
        // zoomControlOptions: {
        //   style: naver.maps.ZoomControlStyle.LARGE,
        //   position: naver.maps.Position.RIGHT_CENTER,
        //   top: 50,
        // },
        draggable: true,
      };

      const mapInstance = new naver.maps.Map(mapElement, mapOptions);
      mapInstanceRef.current = mapInstance;
      const locationBtnHtml = `<div style="background-color: #000; cursor:pointer"><p style="color: #fff;">GetMyPosition<p></div>`;

      //   const customControl = new naver.maps.CustomControl(locationBtnHtml, {
      //     position: naver.maps.Position.RIGHT_CENTER,
      //   });
      //   const customVideLost = '<VideoList />';

      //   naver.maps.Event.once(mapInstance, 'init', function () {
      //     customControl.setMap(mapInstance);

      //     naver.maps.Event.addDOMListener(
      //       customControl.getElement(),
      //       'click',
      //       function () {
      //         const handleClick = async () => {
      //           try {

      //             const latLng = await setLatLng();
      //             mapInstance.setCenter(
      //               new naver.maps.LatLng(1269198601, 376184131)
      //             );
      //           } catch (error) {
      //             console.error('Error fetching location:', error);
      //           }
      //         };

      //         handleClick();
      //       }
      //     );
      //   });
      //   naver.maps.Event.addListener(mapInstance, 'click', function(e){
      //     setIsMapClick()
      //     console.log("isMapClick",isMapClick)
      //   })

      new naver.maps.Marker({
        position: new naver.maps.LatLng(userLat, userLng),
        map: mapInstance,
        icon: {
          content: `
            <div class="food-pin" style="position: relative; box-sizing: border-box; width: 35px; height: 45px; display: flex; flex-direction: row;">
              <img 
                src="/images/meatPin.png" 
                style="z-index: 1; width: 35px; height: 45px;" 
                alt="Picture of the author" 
              />
              <div style="border-radius: 30px; background-color: #ffaaa4; width: 25px; height: 25px; display: flex; justify-content: center; color: #fff; align-items: center; position: absolute; top: -13px; right: -13px; z-index: 999; font-size:13px">
                MyPosition
              </div>
            </div>
          `,
        },
        zIndex: 999,
      });

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
        naver.maps.Event.addListener(
          mapInstanceRef.current,
          'zoom_changed',
          () => {
            if (mapInstanceRef.current !== null) {
              console.log('zoom_changed');
              updateMarkers(mapInstanceRef.current, markerList);
            }
          }
        );
        naver.maps.Event.addListener(mapInstanceRef.current, 'dragend', () => {
          if (mapInstanceRef.current !== null) {
            console.log('DRAGGG');
            updateMarkers(mapInstanceRef.current, markerList);
          }
        });
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
