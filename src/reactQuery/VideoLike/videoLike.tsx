import axios, { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';
import { Font } from '@/components/atomics/Font';
import { Heart, FilledHeart } from '@/components/atomics/Icon';

interface FetchVideoLikeProps {
  videoId: number;
}

const fetchVideoLike = async ({
  videoId,
}: FetchVideoLikeProps): Promise<AxiosResponse<{ numberOfHeart: number }>> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/videos/1/like`;
  const postData = { videoId };
  try {
    const response = await axios.post(url, postData);
    console.log('res', response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
interface PreviousVideoLike {
  previousVideoLike: any;
}

export const useVideoLike = ({ videoId }: { videoId: number }) => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<{ numberOfHeart: number }>, unknown, void>({
    mutationFn: async () => {
      return await fetchVideoLike({ videoId });
    },
    onMutate: async () => {
      // 인자 없이 호출
      console.log('5');
      await queryClient.cancelQueries({ queryKey: ['videoId', videoId] });
      const previousVideoLike = queryClient.getQueryData<any>([
        'videoLike',
        videoId,
      ]);
      const prevNumberOfHearts = previousVideoLike[0].numberOfHeart;

      queryClient.setQueryData(['videoId', videoId], (old: any) => ({
        ...(old || { numberOfHeart: 0 }), // old가 undefined일 경우 기본값 설정
        numberOfHeart: (old?.numberOfHeart || 0) + 1, // 하트를 하나 증가시킴
      }));

      return { prevNumberOfHearts }; // context로 반환
    },
    onError: (err, data, context) => {
      console.log('2');
      console.log('useVideoLikeQuery', err);
      const { previousVideoLike } = context as PreviousVideoLike;
      queryClient.setQueryData(['videoId', videoId], previousVideoLike);
    },
    onSettled: () => {
      console.log('3');
      queryClient.invalidateQueries({
        queryKey: ['videoId', videoId],
      });
    },
    onSuccess: data => {
      console.log('4');
      const newNumberOfHeart = data.data.numberOfHeart; // 서버에서 반환된 numberOfHeart
      queryClient.setQueryData(['videoId', videoId], (old: any) => ({
        ...(old || { numberOfHeart: 0 }), // old가 undefined일 경우 기본값 설정
        numberOfHeart: newNumberOfHeart, // 서버 응답에 따라 numberOfHeart 업데이트
      }));
      console.log('Mutation successful:', newNumberOfHeart);
    },
  });
};

const NumberOfHeartWithValue = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface VideoLikeProps {
  videoId: number;
  numberOfHeart: number;
  isLike: boolean;
}

export const VideoLikeButton = ({
  videoId,
  isLike,
  numberOfHeart,
}: VideoLikeProps) => {
  const { mutate } = useVideoLike({
    videoId,
  });
  const [isClickedHeart, setIsClickedHeart] = useState<boolean>(isLike);
  const [currentNumberOfHeart, setCurrentNumberOfHeart] =
    useState<number>(numberOfHeart);

  const onClickHeart = () => {
    console.log('1');
    mutate(); // 인자 없이 호출
    setIsClickedHeart(!isClickedHeart); // 버튼 클릭 시 하트 상태 변경
  };

  return (
    <>
      {isClickedHeart ? (
        <NumberOfHeartWithValue>
          <FilledHeart color="#FFAAA4" onClick={onClickHeart} />
          <Font
            color="#8E8E8E"
            thick="bold"
            font={10}
            label={currentNumberOfHeart}
          />
        </NumberOfHeartWithValue>
      ) : (
        <NumberOfHeartWithValue>
          <Heart color="#FFAAA4" onClick={onClickHeart} />
          <Font
            color="#8E8E8E"
            thick="bold"
            font={10}
            label={currentNumberOfHeart}
          />
        </NumberOfHeartWithValue>
      )}
    </>
  );
};
