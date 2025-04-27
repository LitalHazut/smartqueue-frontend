
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5152/api',  // Backend API base URL
    headers: {
        'Content-Type': 'application/json',  // Default header for JSON requests
    },
});

// Example API function to get users
export const getUsers = async () => {
    try {
        const response = await apiClient.get('/users');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const createUser = async (userData: any) => {
    try {
        const response = await apiClient.post('/users', userData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const getUserById = async (userId: number) => {
    try {
        const response = await apiClient.get(`/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching user with ID ${userId}:`, error);
        throw error;
    }
};

export default apiClient;
