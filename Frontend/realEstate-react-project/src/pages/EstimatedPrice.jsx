
import React, { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
function PredictForm() {
  const [data, setData] = useState({ location: "", size: "", total_sqft: "", bath: "" });
  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const predict = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const res = await response.json();
    if (res["predicted_price (Lakhs)"]) {
      setResult(`Predicted Price: ₹${res["predicted_price (Lakhs)"]} Lakhs`);
    } else {
      setResult(`Error: ${res.error}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form
        onSubmit={predict}
        className="bg-white shadow-lg rounded-lg p-8 space-y-4 w-full max-w-md"
      >
        <h2 className="text-xl text-black font-bold text-center">Estimate House Price</h2>

        <input
          name="location"
          onChange={handleChange}
          placeholder="Location"
          className=" text-gray-900 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          name="size"
          onChange={handleChange}
          placeholder="e.g. 2 BHK"
          className=" text-gray-900 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          name="total_sqft"
          onChange={handleChange}
          placeholder="e.g. 1200"
          className=" text-gray-900 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          name="bath"
          onChange={handleChange}
          type="number"
          placeholder="Bathrooms"
          className=" text-gray-900 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition"
        >
          Predict
        </button>

        <p className="text-center mt-4 font-medium text-gray-700">{result}</p>
      </form>
    </div>
  );
}

export default PredictForm;
