'use client';
import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
  MutableRefObject,
} from 'react';
import { DEFAULT_ZOOM_LEVEL, DEFAULT_MIN_ZOOM_LEVEL } from '@/constants/map';
import { LatLng, NaverMap } from '@/types/naverMap';
import { Skeleton } from 'antd';
import { SkeletonNodeProps } from 'antd/lib/skeleton/Node';
import styled from 'styled-components';
import { MapFoodFiltering } from '@/components/compounds/MapFoodFiltering';
import './map.css';
import { createGlobalStyle } from 'styled-components';
// import { VideoList } from './videoList';
import { useNaverMap } from '@/hooks/useNaverMap';

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

export default function Map() {
  const [mapElement, setMapElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const element = document.getElementById('map');
    setMapElement(element);
  }, []);
  console.log('mapElement', mapElement);
  return (
    <>
      <MapContainer id="map" />
      <BodyMap mapElement={mapElement} />
    </>
  );
}

interface BodyMapProps {
  mapElement: HTMLElement;
}

const BodyMap = ({ mapElement }: BodyMapProps) => {
  const [isShowVideoList, setIsShowVideoList] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);
  const pinArray = [
    [37.5665851, 37.5792607],
    [126.9782038, 126.9364946],
    [69, 32],
  ];
  const { markerList, callNaverMap, mapInstanceRef } = useNaverMap({
    pinArray: pinArray,
    mapElement: mapElement,
  });
  useEffect(() => {
    if (mapElement) {
      const initializeMap = async () => {
        await callNaverMap();
        if (mapInstanceRef.current) {
          mapInstanceRef.current.addListener('click', function (e) {
            console.log('Click event 발생', e);
            console.log('Coord: ' + e.coord.toString());
          });
        }
      };

      initializeMap();
    }
  }, [mapElement]);
  return (
    <>
      <GlobalStyle />
      <MapFoodFiltering />
      {/* {isShowVideoList && <VideoList />} */}
    </>
  );
};
