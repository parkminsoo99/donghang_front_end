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
import MapSideContent from '@/components/compounds/MapSideContent/mapSideContent';
import { useGetRestaurantsQuery } from '@/reactQuery/NaverMap/naverGetRestaurants';

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;
const MapContainer = styled.div`
  width: 100%;
  height: calc(100vh - 148px);
  position: absolute !important;
`;

const SideBarWithFiltering = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
`;

export default function FoodMap() {
  const [pinArrayReal, setPinArrayReal] = useState<any[]>([]);
  const { data: restaurantsData, isLoading, error } = useGetRestaurantsQuery();
  const [open, setOpen] = useState(false);
  const { LatLng, setLatLng } = useMyPositionStore();
  const mapRef = useRef<HTMLDivElement | null>(null);
  console.log("pinArrayReal",pinArrayReal)
  useEffect(() => {
      setPinArrayReal(restaurantsData);
  }, [restaurantsData,setPinArrayReal]);

  const [isMapReady, setIsMapReady] = useState(false);

  const { callNaverMap, restaurantVideos} = useNaverMap({
    pinArray: pinArrayReal,
    mapElement: mapRef.current, 
    latlng: LatLng,
    open:open,
    setOpen:setOpen,
  });

  useEffect(() => {
    window.scrollTo(0,0);
    setLatLng();

    if (mapRef.current) {
      const initializeMap = async () => {
        await callNaverMap();
        setIsMapReady(false);
      };
      initializeMap();
    }
  }, [callNaverMap]);
  console.log("isMapReady",isMapReady)
  if (isLoading)
    return (
      <Skeleton.Node active={isMapReady}>
        <GlobalStyle />
      </Skeleton.Node>
    );
  if (error) return <p>Error loading data</p>;
  console.log("LATLNG", LatLng)
  return (
    <React.Fragment>
      <MapContainer id="map" ref={mapRef} /> 
      {isMapReady ? (
        <Skeleton.Node active={isMapReady}>
          <GlobalStyle />
        </Skeleton.Node>
      ) : (
        <SideBarWithFiltering>
          <GlobalStyle />
          <MapSideContent setPinArrayReal={setPinArrayReal} open={open} setOpen={setOpen} videoArray={restaurantVideos}/>
        </SideBarWithFiltering>
      )}
    </React.Fragment>
  );
}
