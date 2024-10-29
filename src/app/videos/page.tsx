'use client';
import styled from 'styled-components';
import { VideoTemplate } from '@/components/compounds/VideoContainer';
import { useAuthStore } from '@/zustand/LoginStore/loginStore';
import CustomNotification from '@/components/atomics/Notification';
import { CustomSpinner } from '@/components/atomics/Spinner/indext';
import { useEffect, useRef, useCallback } from 'react';
import { useGetVideoQuery } from '@/reactQuery/Video/getVideo';
import { Font } from '@/components/atomics/Font';

const Container = styled.div`
  background-color: #000;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;
  height: calc(100% - 80px);
  flex-direction: row;
  overflow: auto;
  flex-wrap: wrap;
`;

const ContainerOfVideoNull = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Videos() {
  const { userToken } = useAuthStore();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    error,
    isLoading,
    isFetchingNextPage,
    isSuccess,
  } = useGetVideoQuery({ size: 1, token: userToken }) as any;
  const observerRef = useRef(null);

  const onIntersect = useCallback(
    entries => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(onIntersect);
    const current = observerRef.current;

    const target = document.querySelector('#observer');
    if (target) current.observe(target);

    return () => {
      current.disconnect();
    };
  }, [onIntersect]);

  if (error) {
    CustomNotification({
      message: '동영상을 불러오지 못했습니다.',
      type: 'error',
      duration: 1,
      placement: 'top',
    });
  }
  console.log('isFetchingNextPage', isFetchingNextPage);
  return (
    <Container>
      {isLoading ? (
        <CustomSpinner />
      ) : data === undefined || data.pages.length === 0 ? (
        <ContainerOfVideoNull>
          <Font
            color="#fff"
            font={20}
            label="더 이상 불러올 영상이 없습니다."
          />
        </ContainerOfVideoNull>
      ) : (
        <>
          {isSuccess &&
            data.pages.map(page =>
              page.data.map(videoData => (
                <VideoTemplate
                  key={videoData.videoId}
                  data={{ pages: [page] }}
                  userToken={userToken}
                />
              ))
            )}
          {/* 관찰 대상 요소 */}
          <div id="observer" style={{ width: '100%', height: '1px' }} />
          {/* 로딩 중일 때 표시할 Spinner */}
          {isLoading && <CustomSpinner />}
        </>
      )}
    </Container>
  );
}
