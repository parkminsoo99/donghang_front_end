import styled from 'styled-components';
import { Video } from './video';
import { CustomSpinner } from '@/components/atomics/Spinner/indext';
import { useState, useEffect } from 'react';
import {
  Chat,
  Pause,
  Share,
  Save,
  Heart,
  Position,
  FilledHeart,
} from '@/components/atomics/Icon';
import { Font } from '@/components/atomics/Font';
import CustomNotification from '@/components/atomics/Notification';
import { useInfiniteVideoQuery } from '@/reactQuery/Video/infiniteVideoScroll';
import InfiniteScroll from 'react-infinite-scroller';
const Container = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VideoContainer = styled.div`
  width: 430px;
  height: 670px;
  flex-shrink: 0;
  background-color: none;
  position: relative;
  border-color: #fff;
  z-index: 1;
  border-radius: 40px;
`;

const VideoBottomContainer = styled.div`
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  height: 70px;
  width: 430px;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(255,255,255,0.3);
  border-radius: 0 0 40px 40px;
`;
const FontContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap:6px;
`
const SaveShareIconContainer = styled.div`
  gap: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NumberOfCountOntheIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
  gap:3px;
`;

const PauseChatPositionContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  width: 38px;
  border-radius: 20px;
  border: 1px solid #fff;
  height: 159px;
  background-color: rgba(255, 255, 255, 0.15);
`;

export const VideoTemplate = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isClickedHeart, setIsClickedHeart] = useState<boolean>(true);
  const { data, status, hasNextPage, isFetching, isFetchingNextPage, error } =
    useInfiniteVideoQuery();
  console.log(
    'data, status, hasNextPage, isFetching, isFetchingNextPage, error',
    data,
    status,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    error,
  );

  useEffect(() => {
    if (status === 'success') {
      setIsLoading(false);
    }
  }, [status]);

  if (status === 'error' || error) {
    return <div>Error occurred while fetching data</div>;
  }

  const onClickChattingIcon = () => {
    CustomNotification({
      message: '해당 기능은 아직 이용할 수 없습니다.',
      placement: 'top',
      type: 'warning',
    });
  };

  const onClickHeart = () => {
    setIsClickedHeart(!isClickedHeart);
  };

  return (
    <>
      {isLoading && <CustomSpinner />}
      {!isLoading && (
        <InfiniteScroll
        pageStart={0}
        loadMore={hasNextPage}
        hasMore={hasNextPage}
        loader={
        <CustomSpinner />}
        useWindow={false}
      >
        <Container className="Container">
            <VideoContainer className="VideoContainer">
              <Video radius={40} />
              <VideoBottomContainer>
                <FontContainer>
                  <Font color="#fff" label="이름" font={12}/>
                  <Font color="#fff" label="41234123412341234123412412412412421412412" font={10}/>
                </FontContainer>
                <SaveShareIconContainer>
                  <Save size={32}/>
                  <Share size={32} />
                </SaveShareIconContainer>
              </VideoBottomContainer>
            </VideoContainer>
            <PauseChatPositionContainer>
              {isClickedHeart ? (
                <NumberOfCountOntheIcon>
                  <Heart onClick={() => onClickHeart()} />
                  <Font color="#fff" font={10} label="321" />
                </NumberOfCountOntheIcon>
              ) : (
                <NumberOfCountOntheIcon>
                  <FilledHeart color="#FFAAA4" onClick={() => onClickHeart()} />
                  <Font color="#fff" font={10} label="321" />
                </NumberOfCountOntheIcon>
              )}
              <NumberOfCountOntheIcon>
                <Chat onClick={() => onClickChattingIcon()} />
                <Font color="#fff" font={10} label="0" />
              </NumberOfCountOntheIcon>
              <Position />
            </PauseChatPositionContainer>
            </Container>
          </InfiniteScroll>
      )}
    </>
  );
};
