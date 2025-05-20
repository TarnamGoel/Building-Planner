import axios from 'axios';

const API_URL = 'http://localhost:5500/api';

export const saveImage = async (image) => {
  return axios.post(`${API_URL}/save`, { image });
};

export const fetchImages = async () => {
  const res = await axios.get(`${API_URL}/images`);
  return res.data;
};
