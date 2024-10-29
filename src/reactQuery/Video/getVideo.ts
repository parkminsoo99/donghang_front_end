import axios, { AxiosResponse } from 'axios';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

interface FetchGetVideoProps {
  page: number;
  size: number;
  token: string;
}

export const fetchGetVideo = async ({
  page,
  size,
  token,
}: FetchGetVideoProps): Promise<VideoResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/videos?page=${page}&size=${size}`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `${token}`,
  };
  const response = await axios.get<VideoResponse>(url, { headers });
  return response.data;
};

// export const useGetVideoQuery = ({ page, size, token }: GetVideoProps) => {
//   const { data, error, isLoading } = useQuery({
//     queryKey: ['getVideoQuery', page, size],
//     queryFn: () => fetchGetVideo({ page: page, size:size, token:token}),
//     select: (response) => response.data.data
//   });

//   return { data, error, isLoading };
// };

interface ReactQueryGetVideoProps {
  size: number;
  token: string;
}

interface VideoResponse {
  page: number;
  totalPage: number;
}
export const useGetVideoQuery = ({ size, token }: ReactQueryGetVideoProps) => {
  const {
    data,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
    isLoading,
  } = useInfiniteQuery<VideoResponse>({
    queryKey: ['getVideoQuery', size],
    queryFn: async ({ pageParam }) => {
      return fetchGetVideo({ page: pageParam as number, size, token });
    },
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      return lastPage.page != lastPage.totalPage - 1
        ? lastPage.page + 1
        : undefined;
    },
  });

  return {
    data,
    fetchNextPage,
    isSuccess,
    hasNextPage,
    isFetchingNextPage,
    error,
    isLoading,
  };
};
