import axios, {AxiosResponse} from 'axios';

export const fetchGetRestaurantVideos = async (restaurantId:number): Promise<AxiosResponse<any,any>> => {
    try{
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/restaurants/${restaurantId}`;
        return await axios.get(url)
    }catch(e){
        console.log("fetchGetRestaurantVideos Error : ", e.message)
    }
}