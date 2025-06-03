import { useState } from "react";
import { registerUser } from "../services/Api"; 
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "buyer",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      if (response?.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
      }
      if (response?.token) {
        localStorage.setItem("token", response.token);
      }
      navigate("/login");
    } catch (err) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-black text-center mb-6">Create an Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-black">Name</label>
            <input 
              type="text" 
              name="name" 
              onChange={handleChange} 
              placeholder="Enter your name" 
              required 
              className="w-full px-4 py-2 mt-1 bg-white text-black border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div>
            <label className="block text-black">Email</label>
            <input 
              type="email" 
              name="email" 
              onChange={handleChange} 
              placeholder="Enter your email" 
              required 
              className="w-full px-4 py-2 mt-1 bg-white text-black border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div>
            <label className="block text-black">Password</label>
            <input 
              type="password" 
              name="password" 
              onChange={handleChange} 
              placeholder="Create a password" 
              required 
              className="w-full px-4 py-2 mt-1 bg-white text-black border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div>
            <label className="block text-black">Phone Number</label>
            <input 
              type="text" 
              name="phone" 
              onChange={handleChange} 
              placeholder="Enter your phone number" 
              required 
              className="w-full px-4 py-2 mt-1 bg-white text-black border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div>
            <label className="block text-gray-400">Role</label>
            <select 
              name="role" 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-2 mt-1 bg-white text-black border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button 
            type="submit" 
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-4">
          Already have an account? 
          <a href="/login" className="text-red-500 hover:underline"> Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;




  