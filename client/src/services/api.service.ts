import axios from "axios";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export async function getRequest(url : string, params = {}) {
  try {
    const response = await axios.get(`${SERVER_BASE_URL}${url}`, { params });
    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  
}