import {getRequest} from './api.service';

export async function getAlbumInsights() {
  try {
    const responseData = await getRequest('/music/album/4aawyAB9vmqN3uQ7FjRGTy/insights');
    return responseData;
  } catch (error) {
    console.error('Error fetching album insights:', error);
  }
}