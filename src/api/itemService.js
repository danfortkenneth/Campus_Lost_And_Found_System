import API from './axiosInstance';


export const getItems = async (filters) => {
    try {
        const { search, category, status, start, end } = filters;
        const cat = category === "All Categories" ? "" : category;
        const stat = status === "All Status" ? "" : status.toLowerCase();
        
        const { data } = await API.get(`/items/search?q=${search}&category=${cat}&status=${stat}&start=${start}&end=${end}`);
        return data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch items." };
    }
};


export const createItem = async (itemData) => {
    try {
        const { data } = await API.post('/items', itemData);
        return data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to submit report." };
    }
};


export const getMyActivity = async () => {
    try {
        const { data } = await API.get('/items/my-activity');
        return data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch activities." };
    }
};