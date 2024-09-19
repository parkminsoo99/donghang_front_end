// pages/index.js
'use client';
import { useEffect, useState } from 'react';
import { DEFAULT_ZOOM_LEVEL, DEFAULT_MIN_ZOOM_LEVEL } from '@/constants/map';
import { LatLng, NaverMap } from '@/types/naverMap';
import { Skeleton } from 'antd';
import { SkeletonNodeProps } from 'antd/lib/skeleton/Node';
import styled from 'styled-components';
import { MapFoodFiltering } from '@/components/compounds/MapFoodFiltering';
import './map.css';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

interface MapProps {
  latlng: LatLng;
}
interface initialScriptProps {
  src: string;
  callback: () => void;
}
const StyledSkeleton = styled(Skeleton.Node)<SkeletonNodeProps>`
  width: 100% !important;
  height: 100% !important;
  position: relative !important;
  & > div {
    display: block !important;
    line-height: 0px !important;
  }
`;
const initialNaverMapScript = ({ src, callback }: initialScriptProps) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = src;
  script.onload = () => callback();
  document.head.appendChild(script);
};
const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;
export default function Map() {
  let mapInstance: naver.maps.Map | null = null;

  const makerOptions = {};

  // 아이콘 생성 및 마커 설정
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const initNavermap = () => {
    const mapOptions = {
      center: new naver.maps.LatLng(37.5665, 126.978), // 서울 중심 좌표
      zoom: DEFAULT_ZOOM_LEVEL,
      minZoom: DEFAULT_MIN_ZOOM_LEVEL,
      zoomControl: true,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.LARGE,
        position: naver.maps.Position.TOP_RIGHT,
      },
      draggable: true,
    };

    if (document.getElementById('map')) {
      mapInstance = new naver.maps.Map('map', mapOptions);
    }
    if (mapInstance) {
      const number = 123;
      const secondaryMarker = new naver.maps.Marker({
        icon: {
          content: `
                    <div style="position: relative; box-sizing: border-box; width: 35px; height: 45px; display: flex; flex-direction: row;">
                    <img 
                      src="/images/meatPin.png" 
                      style="z-index: 1; width: 35px; height: 45px;" 
                      alt="Picture of the author" 
                    />
                    <div style="border-radius: 30px; background-color: #ffaaa4; width: 25px; height: 25px; display: flex; justify-content: center; color: #fff; align-items: center; position: absolute; top: -13px; right: -13px; z-index: 999; font-size:13px">
                      ${number}
                    </div>
                  </div>
                `,
        },
        position: new naver.maps.LatLng(37.57240596122543, 126.97689056396484),
        map: mapInstance,
      });
    }
    setIsMapLoaded(true);
  };

  useEffect(() => {
    if (typeof naver === 'undefined') {
      const src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`;
      initialNaverMapScript({
        src: src,
        callback: initNavermap,
      });
    } else {
      initNavermap();
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      {/* <StyledSkeleton active={isMapLoaded} > */}
      {/* <MapContainer id="map"></MapContainer> */}
      <MapFoodFiltering />
      {/* </StyledSkeleton> */}
    </>
  );
}
