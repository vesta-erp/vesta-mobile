import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const api = axios.create({
  baseURL: 'https://vesta-api-java-gwf7drgza3hjgfc6.brazilsouth-01.azurewebsites.net',
});

api.interceptors.request.use(async (config) => {
  try {
    const isAuthRoute = config.url?.includes('/auth/');
    if (!isAuthRoute) {
      const token = await AsyncStorage.getItem('@Vesta:token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  } catch (error) {
    return config;
  }
});