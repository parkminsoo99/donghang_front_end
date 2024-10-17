import axios, { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { CustomSpinner } from '@/components/atomics/Spinner/indext';
const fetchGetRestaurants = async (): Promise<AxiosResponse<any, any>> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/restaurants`;
    return await axios.get(url);
  } catch (e) {
    throw new Error('fetchGetRestaurant Erorr : ', e.message);
  }
};

export const useGetRestaurantsQuery = () => {
  return useQuery({
    queryKey: ['fetchGetRestaurants'],
    queryFn: fetchGetRestaurants,
    retry: 3,
    select: data => data.data,
  });
};
