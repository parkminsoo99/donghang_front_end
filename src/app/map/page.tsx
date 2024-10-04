'use client';
import {
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
import { SkeletonNodeProps } from 'antd/lib/skeleton/Node';
import styled from 'styled-components';
import { MapFoodFiltering } from '@/components/compounds/MapFoodFiltering';
import './map.css';
import { createGlobalStyle } from 'styled-components';
import { useNaverMap } from '@/hooks/useNaverMap';
import { useMyPositionStore } from '@/zustand/MyPositionStore/myPositionStore';
import { MapSideBar } from '@/components/compounds/MapSideBar/mapSideBar';
import { List } from '@/components/atomics/Icon';
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
  // const handleClick = (e: naver.maps.PointerEvent) => {
  //   console.log('Click event 발생', e);
  // };
  // console.log("mapRef",document.querySelector('.nmap-sidenav'))
  return (
    <>
      {isMapReady && (
        <Skeleton.Node active={isMapReady}>
          <GlobalStyle />
        </Skeleton.Node>
      )}
      <MapContainer ref={mapRef} id="map" />
      <BodyMap
        mapElement={mapElement}
        mapInstanceRef={mapInstanceRef}
        isMapReady={isMapReady}
      />
    </>
  );
}

interface BodyMapProps {
  mapElement: HTMLElement;
  mapInstanceRef: MutableRefObject<naver.maps.Map>;
  isMapReady: boolean;
}

const BodyMap = ({ mapElement, mapInstanceRef, isMapReady }: BodyMapProps) => {
  const [isShowVideoList, setIsShowVideoList] = useState(false);
  const showVideoRef = useRef<boolean>(false);
  const mapSideBarRef = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(false);
  const onClickEvent = () => {
    setIsShow(!isShow);
  };
  // console.log("mapInstanceRef",mapElement, mapInstanceRef)
  // const handleClick = (e) => {
  //   console.log('Click event 발생', e);
  //   console.log('Coord: ' + e.coord.toString());
  // };
  // mapElement.addEventListener('click',handleClick)
  // naver.maps.Event.addListener(mapInstanceRef.current, 'click', )
  useEffect(() => {
    if (mapInstanceRef.current) {
      // console.log('Click event 발생');
      // mapInstanceRef.current.addListener('click', handleClick);
    }
  }, [mapInstanceRef]);
  // if(MapSideBar){
  //   const mapFilteringWidth = document.querySelector('.map-side-bar').clientWidth;
  //   console.log("mapFilteringWidth",mapFilteringWidth)
  // }

  return (
    <>
      <GlobalStyle />
      <SideBarWithFiltering>
        <MapSideBar isShow={isShow} className="map-side-bar" />
        <MapFoodFiltering isSideBarShow={isShow} />
        <List onClick={onClickEvent} size={28} color="#FFAAA4" />
      </SideBarWithFiltering>
    </>
  );
};
