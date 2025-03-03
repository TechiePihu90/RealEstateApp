import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";


// 🔹 User Signup
export const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/register`, userData);
     console.log("Signup api response",response.data)
      return response.data;
    } catch (error) {
      console.error("Signup API Error:", error);
      throw error.response?.data || { message: "Something went wrong!" };
    }
  };
  

// 🔹 User Login
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// 🔹 Fetch All Properties
export const getProperties = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/properties`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// 🔹 Fetch Property By ID
export const getPropertyById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/properties/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// 🔹 Create Property (Protected Route)
export const createProperty = async (propertyData, token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/properties`, propertyData, {
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
    const response = await axios.get(`${API_BASE_URL}/properties/search/${location}`);
    return response.data;
  } catch (error) {
    console.error("Search API Error:", error);
    throw error.response?.data || { message: "Something went wrong!" };
  }
};

export const deleteProperty = async (propertyId) => {
  try {
    const token = localStorage.getItem("token"); // Ensure the user is authenticated
    await axios.delete(`${API_BASE_URL}/properties/${propertyId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw error.response?.data || "Error deleting property";
  }
};
