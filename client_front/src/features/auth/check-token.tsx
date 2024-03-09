import axiosInstance from "@/shared/api/api-instance";

export async function checkTokenValidity() {
    try {
      const response = await axiosInstance.get('/getme');
      return response.data.valid;
    } catch (error) {
      console.error('Error:', error);
      return false
    }
}
