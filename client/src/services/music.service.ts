import {getRequest} from './api.service';

export async function getAlbumInsights() {
  try {
    const responseData = await getRequest('/albums/4aawyAB9vmqN3uQ7FjRGTy/insights');
    return responseData;
  } catch (error) {
    console.error('Error fetching album insights:', error);
  }
}

export async function getTrackDetails(albumId: string) {
  try {
    const responseData = await getRequest(`/albums/${albumId}/tracks`);
    return responseData;
  } catch (error) {
    console.error('Error fetching track details:', error);
  }
}