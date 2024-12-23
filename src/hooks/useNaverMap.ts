import { useEffect, useRef, useCallback, useState } from 'react';
import { LatLng, ZoomControlStyle, NaverMap, Marker } from '@/types/naverMap';
import { useMyPositionStore } from '@/zustand/MyPositionStore/myPositionStore';
import { useIsMapClick } from '@/zustand/MapClickStore/IsMapClick';
import { isNil } from 'lodash';
import { foodImageHastTable } from '@/constants/foodLists';
import { useGetRestaurantsByIdQuery } from '@/reactQuery/NaverMap/naverGetRestaurantVideos';
import { AxiosResponse } from 'axios';
import { useAuthStore } from '@/zustand/LoginStore/loginStore';
interface useNaverMapProps {
  pinArray: any;
  mapElement: HTMLElement;
  latlng: {
    lat: number;
    lng: number;
  };
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useNaverMap = ({
  pinArray,
  mapElement,
  latlng,
  open,
  setOpen,
}: useNaverMapProps) => {
  const markerList = [] as Marker[];
  const mapInstanceRef = useRef<NaverMap | null>(null);
  const { setLatLng } = useMyPositionStore();
  const { setIsMapClick } = useIsMapClick();
  const [restaurantId, setRestaurantId] = useState<number | null>(null);

  const { userToken } = useAuthStore();
  const { data: restaurantVideos } = useGetRestaurantsByIdQuery(
    restaurantId,
    userToken
  );
  console.log('restaurantId', restaurantId);
  const callNaverMap = useCallback(async () => {
    try {
      initNavermap();
    } catch (error) {
      console.error('Error loading script:', error);
    }
  }, []);

  const showMarker = useCallback(
    (map: naver.maps.Map, marker: naver.maps.Marker) => {
      marker.setMap(map);
    },
    []
  );

  const hideMarker = useCallback((marker: naver.maps.Marker) => {
    marker.setMap(null);
  }, []);

  const updateMarkers = useCallback(
    (map: naver.maps.Map, markers: naver.maps.Marker[]) => {
      const mapBounds: any = map.getBounds();

      for (let i = 0; i < markers.length; i++) {
        const position = markers[i].getPosition();

        if (mapBounds.hasLatLng(position)) {
          showMarker(map, markers[i]);
        } else {
          hideMarker(markers[i]);
        }
      }
    },
    [showMarker, hideMarker]
  );

  const initNavermap = useCallback(async () => {
    if (typeof naver !== 'undefined' && mapElement) {
      let userLat;
      let userLng;
      if (!isNil(latlng)) {
        userLat = latlng.lat;
        userLng = latlng.lng;
      } else {
        userLat = 37.5665;
        userLng = 126.978;
      }

      const mapOptions = {
        center: new naver.maps.LatLng(userLat, userLng),
        zoom: 14,
        minZoom: 12,
        maxZoom: 17,
        draggable: true,
      };

      const mapInstance = new naver.maps.Map(mapElement, mapOptions);
      mapInstanceRef.current = mapInstance;
      console.log('userpin', userLat, userLng);
      // 사용자 마커 생성
      new naver.maps.Marker({
        position: new naver.maps.LatLng(userLat, userLng),
        map: mapInstance,
        icon: {
          content: `
            <div class="food-pin" style="position: relative; box-sizing: border-box; width: 35px; height: 45px; display: flex; flex-direction: row;">
              <img 
                src="/images/pins/userPin.png" 
                style="z-index: 1; width: 35px; height: 45px;" 
                alt="Picture of the author" 
              />
            </div>
          `,
        },
      });

      // 음식점 마커 생성
      for (let i = 0; i < pinArray.length; i++) {
        const lng = pinArray[i].longitude / 1e7;
        const lat = pinArray[i].latitude / 1e7;
        const restaurantPosition = new naver.maps.LatLng(lng, lat);
        const CountOfVideo = pinArray[i].videoCount;
        const imageSrc = foodImageHastTable[pinArray[i].category];
        const restaurantId = pinArray[i].restaurantId;
        const restaurantName = pinArray[i].name;

        const marker = new naver.maps.Marker({
          icon: {
            content: `
                <div class="food-pin" style="position: relative; box-sizing: border-box; width: 35px; height: 45px; display: flex; flex-direction: row;">
                  <img 
                     src=${imageSrc}
                    style="z-index: 1; width: 35px; height: 45px;" 
                    alt="Picture of the author" 
                  />
                  <div style="border-radius: 30px; background-color: #ffaaa4; width: 25px; height: 25px; display: flex; justify-content: center; color: #fff; align-items: center; position: absolute; top: -13px; right: -13px; z-index: 999; font-size:13px">
                    ${CountOfVideo}
                  </div>
                </div>
              `,
          },
          position: restaurantPosition,
          map: mapInstance,
        });

        markerList.push(marker);

        naver.maps.Event.addListener(marker, 'click', () => {
          setRestaurantId(restaurantId);
          mapInstance.setCenter(restaurantPosition);
          if (!open) {
            setOpen(!open);
          }
        });

        // Info Window 설정
        const contentEl = document.createElement('div');
        contentEl.className = 'iw_inner';
        contentEl.style.boxSizing = 'border-box';
        contentEl.style.position = 'absolute';
        contentEl.style.padding = '20px 50px';
        contentEl.style.borderRadius = '25px';
        contentEl.style.top = '100px';
        contentEl.style.left = '54%';
        contentEl.style.transform = 'translateX(-50%)';
        contentEl.style.backgroundColor = '#fff';
        contentEl.style.border = 'solid 1px #333';
        contentEl.style.display = 'inline-block';
        contentEl.innerHTML = `
          <div style="display: inline-block; font-weight:bold;">${restaurantName}</div>
        `;
        const disPlayTitle = '릴스보기';
        const contentElWatchVideoButton = document.createElement('div');
        contentElWatchVideoButton.className = 'iw_inner';
        contentElWatchVideoButton.style.boxSizing = 'border-box';
        contentElWatchVideoButton.style.position = 'absolute';
        contentElWatchVideoButton.style.padding = '15px 50px';
        contentElWatchVideoButton.style.borderRadius = '25px';
        contentElWatchVideoButton.style.bottom = '10px';
        contentElWatchVideoButton.style.left = '50%';
        contentElWatchVideoButton.style.transform = 'translateX(-50%)';
        contentElWatchVideoButton.style.backgroundColor = '#FFA4A4';
        contentElWatchVideoButton.style.border = 'solid 1px #333';
        contentElWatchVideoButton.style.display = 'inline-block';
        contentElWatchVideoButton.style.cursor = 'pointer';
        contentElWatchVideoButton.style.transition =
          'background-color 0.5s ease';
        contentElWatchVideoButton.style.borderColor = '#fff';
        contentElWatchVideoButton.innerHTML = `
          <a href="/videos" style="text-decoration: none; color: #fff; font-weight: bold;">${disPlayTitle}</a>
        `;

        contentElWatchVideoButton.addEventListener('mouseenter', () => {
          contentElWatchVideoButton.style.backgroundColor = '#8E8E8E';
          contentElWatchVideoButton.style.borderColor = '#fff';
          contentElWatchVideoButton.style.color = '#000';
        });
        contentElWatchVideoButton.addEventListener('mouseleave', () => {
          contentElWatchVideoButton.style.backgroundColor = '#FFA4A4';
          contentElWatchVideoButton.style.borderColor = '#fff';
          contentElWatchVideoButton.style.color = '#fff';
        });

        // 부모 요소에 추가
        mapInstance.getElement().appendChild(contentElWatchVideoButton);

        naver.maps.Event.addListener(marker, 'mouseover', () => {
          mapInstance.getElement().appendChild(contentEl);
        });

        naver.maps.Event.addListener(marker, 'mouseout', () => {
          const parent = mapInstance.getElement();
          if (parent.contains(contentEl)) {
            parent.removeChild(contentEl);
          }
        });

        naver.maps.Event.addListener(
          mapInstanceRef.current,
          'zoom_changed',
          () => {
            if (mapInstanceRef.current !== null) {
              updateMarkers(mapInstanceRef.current, markerList);
            }
          }
        );

        naver.maps.Event.addListener(mapInstanceRef.current, 'dragend', () => {
          if (mapInstanceRef.current !== null) {
            updateMarkers(mapInstanceRef.current, markerList);
          }
        });
      }
    } else {
      console.log('NAVER Maps is not defined');
    }
  }, [mapElement, latlng, pinArray, updateMarkers]);

  useEffect(() => {
    initNavermap();
  }, [pinArray]);

  return { markerList, callNaverMap, mapInstanceRef, restaurantVideos };
};
