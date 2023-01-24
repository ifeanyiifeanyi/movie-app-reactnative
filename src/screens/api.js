import { BASE_URL } from '@env';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';





export const initCsrf = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/sanctum/csrf-cookie`);
        await AsyncStorage.setItem('token', response.data.token);
        console.log("CSRF cookie set: ", response.data.token);
    } catch (error) {
        console.log("Error initializing CSRF: ", error);
    }
};