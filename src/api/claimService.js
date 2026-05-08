import API from './axiosInstance';

export const submitClaim = async (claimData) => {
    try {
        const { data } = await API.post('/claims/submit', claimData);
        return data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to submit claim." };
    }
};

export const getAllClaims = async () => {
    try {
        const { data } = await API.get('/claims/all');
        return data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch claims." };
    }
};


export const updateClaimStatus = async (id, status) => {
    try {
        const { data } = await API.patch(`/claims/update-status/${id}`, { status });
        return data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to update claim." };
    }
};


export const getUserClaims = async (userId) => {
    try {
        
        const { data } = await API.get(`/claims/user/${userId}`);
        return data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch your claims." };
    }
};