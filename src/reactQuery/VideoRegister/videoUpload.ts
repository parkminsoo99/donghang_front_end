import axios, { AxiosResponse } from 'axios';
interface fetchVideoUploadProps {
  method: string;
  url: string;
  token: string;
}
export const fetchVideoUpload = async ({
  method,
  url,
  token,
}: fetchVideoUploadProps): Promise<AxiosResponse<any, any>> => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    };
    return await axios({
      method: method,
      url: url,
      headers,
    });
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      throw new Error(
        `fetchVideoRegister Error: ${e.response?.statusText || e.message}`
      );
    } else {
      throw new Error(`fetchVideoRegister Error: ${e.message}`);
    }
  }
};
