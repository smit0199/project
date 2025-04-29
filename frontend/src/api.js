import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(`${API_URL}/events`, eventData);
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

export const getEvents = async () => {
  try {
    const res = await axios.get(`${API_URL}/events`);
    return res.data;
  } catch (err) {
    console.error('Error fetching events:', err);
    throw err;
  }
};

export const signupUser = async (userData) => {
  const res = await axios.post(`${API_URL}/signup`, userData);
  return res.data;
};
  
export const loginUser = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData);
  return res.data;
};