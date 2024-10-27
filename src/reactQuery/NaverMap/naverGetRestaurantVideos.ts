import axios, { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';

// 레스토랑 비디오를 가져오는 함수
const fetchGetRestaurantVideos = async (
  restaurantId: number
): Promise<AxiosResponse<any, any>> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/restaurants/${restaurantId}`;
    return await axios.get(url);
  } catch (e) {
    console.log('fetchGetRestaurantVideos Error: ', e.message);
    throw e; // 오류를 던져야 useQuery에서 에러를 처리할 수 있습니다.
  }
};

// 레스토랑 ID로 비디오를 가져오는 훅
export const useGetRestaurantsByIdQuery = (restaurantId: number) => {
  return useQuery({
    queryKey: ['videoId', restaurantId],
    queryFn: () => fetchGetRestaurantVideos(restaurantId), // 함수의 참조를 전달
    retry: 3,
  });
};
