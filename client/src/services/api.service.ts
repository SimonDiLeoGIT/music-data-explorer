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

export async function downloadPDF(url: string, data = {}) {
  try {
    const response = await axios.post(`${SERVER_BASE_URL}${url}`, data, {
      responseType: 'blob'
    });
    
    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }
    
    return response.data; // Esto devuelve un Blob
  } catch (error) {
    console.error('Error downloading PDF:', error);
    throw error;
  }
}