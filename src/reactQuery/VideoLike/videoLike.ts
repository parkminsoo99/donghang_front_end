import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/zustand/LoginStore/loginStore';
import { NeedToLogInNotification } from '@/components/compounds/Form/loginSubmitFunction';

interface FetchVideoLikeProps {
  videoId: number;
  token: string;
}

// 서버에 요청하는 함수
export const fetchVideoLike = async ({
  videoId,
  token,
}: FetchVideoLikeProps): Promise<any> => {
  try {
    console.log('Request videoId, token:', videoId, token);
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/videos/${videoId}/like`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    };
    const response = await axios.put(url, {}, { headers });
    console.log('Response:', response.data);
    return response; // 서버에서 반환하는 데이터 { numberOfHeart }
  } catch (e) {
    if (e.response && e.response.status === 401) {
      throw new Error('Unauthorized');
    }
    throw new Error(`fetchVideoLike Error: ${e.message}`);
  }
};

interface VideoLikeProps {
  videoId: number;
  token: string;
}

export const useVideoLikeMutation = ({ videoId, token }: VideoLikeProps) => {
  const queryClient = useQueryClient();
  const { logout } = useAuthStore();
  const queryKey = ['videoLike', videoId];

  return useMutation({
    mutationFn: () => fetchVideoLike({ videoId, token }),

    // 낙관적 업데이트 적용
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: queryKey });

      const previousVideoLike = queryClient.getQueryData<{
        numberOfHeart: number;
      }>(queryKey);
      console.log('previousVideoLike', previousVideoLike);

      // 캐시에 데이터가 없으면 기본값을 설정
      if (!previousVideoLike) {
        queryClient.setQueryData(queryKey, { numberOfHeart: 0 });
      } else {
        // 낙관적 업데이트: 좋아요 수 증가
        queryClient.setQueryData(queryKey, {
          ...previousVideoLike,
          numberOfHeart: previousVideoLike.numberOfHeart + 1,
        });
      }

      return { previousVideoLike };
    },

    // 에러 발생 시 이전 상태로 복구 및 로그아웃 처리
    onError: (error, variables, context) => {
      console.error('Error during optimistic update:', error);
      if (context?.previousVideoLike) {
        queryClient.setQueryData(queryKey, context.previousVideoLike);
      }
      if (error.message === 'Unauthorized') {
        logout(); // 401 에러 발생 시 로그아웃
        NeedToLogInNotification();
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
