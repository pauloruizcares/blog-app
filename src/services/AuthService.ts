import axios from 'axios';
import { SessionUserResponse } from '../models/responses/SessionUser';

const BASE_URL = 'http://localhost:4000';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const checkSession = async () => {
  try {
    const { data } = await axiosInstance.get('/api/auth/check-session');
    return data;
  } catch (error) {
    throw new Error('Error checking session');
  }
};

const fetchUserData = async () => {
  try {
    const { data } = await axiosInstance.get('/api/auth/user');
    return data;
  } catch (error) {
    throw new Error('Error fetching user data');
  }
};

export const getUserSession = async (): Promise<SessionUserResponse> => {
  try {
    const dataSession = await checkSession();

    if (dataSession.authenticated) {
      const dataUser = await fetchUserData();

      return {
        authenticated: dataSession.authenticated,
        user: {
          displayName: dataUser.displayName,
          photoURL: dataUser.photos[0].value,
        },
      };
    }

    return {
      authenticated: dataSession.authenticated,
      user: {
        displayName: '',
        photoURL: '',
      },
    };
  } catch (error) {
    throw new Error('Error getting user session');
  }
};

export const logout = async () => {
  try {
    await axiosInstance.post('/api/auth/logout');
  } catch (error) {
    throw new Error('Error logging out');
  }
};
