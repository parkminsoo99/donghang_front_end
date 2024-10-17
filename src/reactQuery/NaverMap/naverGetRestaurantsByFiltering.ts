
import axios, {AxiosResponse} from 'axios';

interface fetchGetRestaurantsByFilteringProps{
    lat:number;
    lng:number;
    distance:number;
    foodList:string[];
}
export const fetchGetRestaurantsByFiltering = async({
lat,
lng,
distance,
foodList,
}:fetchGetRestaurantsByFilteringProps) => {
    console.log("foodList",foodList)
    try{
        const categories = foodList.join(',')
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/restaurants/nearby?userLat=${lat}&userLon=${lng}&radius=${10000}&categories=${categories}`;
        return await axios.get(url)
    }catch(e){
        console.log("fetchGetRestaurantsByFiltering Error :", e.message)
    }
  


}