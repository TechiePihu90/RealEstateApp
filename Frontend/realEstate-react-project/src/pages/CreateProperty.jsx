import { useState } from "react";
import { createProperty } from "../services/Api";
import { useNavigate } from "react-router-dom";

function CreateProperty() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return null;
  }

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    console.log("File input changed!"); // Debugging check
    const files = Array.from(e.target.files);
    console.log("Selected Files:", files); // Check if files are being received
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: [...prevFormData.images, ...files], // Properly updating array
    }));
  
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("location", formData.location);

    formData.images.forEach((image) => {
      formDataToSend.append("images", image);
    });

    try {
      await createProperty(formDataToSend, token);
      alert("Property created successfully!");
      navigate("/");
    } catch (error) {
      alert(error.message || "Failed to create property");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  p-4">
      <div className="bg-white text-black max-w-lg w-full p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">Create a New Property</h2>
        <form action="/multiple-upload" encType="multipart/form-data" method="POST"  onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="w-full p-3  border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500" required />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-3  border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500" required />
          <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full p-3  border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500" required />
          <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="w-full p-3  border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500" required />

          {/* Image Upload */}
          <div className="w-full p-3  border border-gray-600 rounded-lg">
            <input
              multiple
              type="file"
              name="images"
              onChange={handleFileChange}
              className="w-full text-gray-600 cursor-pointer"
              required
            />
          </div>

          {/* Image Preview */}
          {imagePreviews.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {imagePreviews.map((src, index) => (
                <img key={index} src={src} alt="preview" className="w-20 h-20 object-cover rounded-md border border-gray-600" />
              ))}
            </div>
          )}

          <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-red-500 transition duration-300">
            Create Property
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProperty;



