import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



// User Signup
export const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/register`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Something went wrong!" };
    }
  };
  

//User Login
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/users/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Fetch All Properties
export const getProperties = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/properties`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Fetch Property By ID
export const getPropertyById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/properties/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Create Property (Protected Route)
export const createProperty = async (propertyData, token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/properties`, propertyData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};




export const searchProperties = async (location) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/properties/search/${location}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong!" };
  }
};

export const deleteProperty = async (propertyId) => {
  try {
    const token = localStorage.getItem("token"); // Ensure the user is authenticated
    await axios.delete(`${API_BASE_URL}/api/properties/${propertyId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw error.response?.data || "Error deleting property";
  }
};
