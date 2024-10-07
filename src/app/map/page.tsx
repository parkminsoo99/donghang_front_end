'use client';
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
  MutableRefObject,
  useLayoutEffect,
} from 'react';
import { DEFAULT_ZOOM_LEVEL, DEFAULT_MIN_ZOOM_LEVEL } from '@/constants/map';
import { LatLng, NaverMap } from '@/types/naverMap';
import { Skeleton } from 'antd';
import styled from 'styled-components';
import './map.css';
import { createGlobalStyle } from 'styled-components';
import { useNaverMap } from '@/hooks/useNaverMap';
import { useMyPositionStore } from '@/zustand/MyPositionStore/myPositionStore';
import MapSideBar from '@/components/compounds/MapSideBar/mapSideBar';
const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;
const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute !important;
`;

const SideBarWithFiltering = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
`;
export default function FoodMap() {
  const [mapElement, setMapElement] = useState<HTMLElement | null>(null);
  const pinArray = [
    [37.5665851, 37.5792607],
    [126.9782038, 126.9364946],
    [69, 32],
  ];
  const [isMapReady, setIsMapReady] = useState(true);
  const { LatLng, setLatLng } = useMyPositionStore();
  const mapRef = useRef(null);
  const { markerList, callNaverMap, mapInstanceRef } = useNaverMap({
    pinArray: pinArray,
    mapElement: mapElement,
    latlng: LatLng,
  });

  useEffect(() => {
    const element = document.getElementById('map');
    setMapElement(element);
    setLatLng();
    console.log('LatLng', LatLng);
  }, []);
  useEffect(() => {
    if (mapElement) {
      const initializeMap = async () => {
        await callNaverMap();
        setIsMapReady(false);
      };
      initializeMap();
    }
  }, [mapElement, callNaverMap]);
  console.log('isMapReady', isMapReady);
  return (
    <React.Fragment>
      {isMapReady && (
        <Skeleton.Node active={isMapReady}>
          <GlobalStyle />
        </Skeleton.Node>
      )}
      <MapContainer ref={mapRef} id="map" />
      {!isMapReady && (
        <>
          <SideBarWithFiltering>
            <GlobalStyle />
            <MapSideBar />
          </SideBarWithFiltering>
        </>
      )}
    </React.Fragment>
  );
}
