import API from './axiosInstance';

export const loginUser = async (credentials) => {
    try {
        const { data } = await API.post('/auth/login', credentials);
        return data; 
    } catch (error) {
        throw error.response?.data || { message: "Server error, try again later." };
    }
};

export const signupUser = async (userData) => {
    try {
        const { data } = await API.post('/auth/signup', userData);
        return data;
    } catch (error) {
        throw error.response?.data || { message: "Signup failed." };
    }
};




export const getAllUsers = async () => {
    try {
        const { data } = await API.get('/auth/users'); 
        
        return data; 
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch users." };
    }
};


export const removeUser = async (userId) => {
    try {
        const { data } = await API.delete(`/auth/user/${userId}`);
      
        return data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to delete user." };
    }
};