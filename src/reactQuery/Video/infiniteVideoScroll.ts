import { useInfiniteQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { CustomSpinner } from '@/components/atomics/Spinner/indext';
const fetchVideoList = async (): Promise<any> => {
  try {
    // const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/restaurants`;
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const res = await axios.get(url);
    if (res.status == 200) {
      return res.data;
    }
  } catch (e) {
    console.log('fetchVideoList Error : ', e.message);
  }
};
export const useInfiniteVideoQuery = () => {
  const {
    data,
    error,
    fetchNextPage,
    status,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['fetchVideoList'],
    queryFn: fetchVideoList,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage?.nextCursor ?? false,
  });
  return { data, status, hasNextPage, isFetching, isFetchingNextPage, error };
};
