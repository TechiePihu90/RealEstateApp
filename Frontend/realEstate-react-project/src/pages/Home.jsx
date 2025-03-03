import { useEffect, useState } from "react";
import { getProperties, searchProperties, deleteProperty } from "../services/Api"; // Import delete API
import { Link } from "react-router-dom";
import Footer from "./Footer"; 

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null); // Store logged-in user info

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    // Fetch logged-in user details from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedInUser);

    fetchProperties();
  }, []);

  // Handle search
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const searchResults = await searchProperties(searchQuery);
      setProperties(searchResults);
    } catch (error) {
      console.error("Error searching properties:", error);
    }
  };

  // Handle delete property
  const handleDelete = async (propertyId) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    
    try {
      await deleteProperty(propertyId); // API call to delete
      setProperties(properties.filter((p) => p._id !== propertyId)); // Update UI
      alert("Property deleted successfully!");
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("Failed to delete property.");
    }
  };

  return (
    <div className="mt-16 p-6 text-white min-h-screen bg-gray-900">
      <h1 className="text-3xl font-bold text-center mb-6">
        "Find Your Dream Home, Hassle-Free!"
      </h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by location (e.g., Mansarovar)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-3 w-1/2 rounded-l-md text-blue border-2 border-white"
        />
        <button onClick={handleSearch} className="bg-red-500 p-3 text-white rounded-r-md">
          Search
        </button>
      </div>

      <h2 className="text-2xl font-bold my-4">Properties</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {properties.length > 0 ? (
          properties.map((property) => {
            return (
              <div key={property._id} className="border p-4 rounded-lg shadow-lg">
                <Link to={`/property/${property._id}`}>
                  <div className="w-full h-48 flex overflow-x-auto space-x-2">
                    {property.images && property.images.length > 0 ? (
                      property.images.map((image, index) => (
                        <img
                          key={index}
                          src={`http://localhost:3000/${image}`}
                          alt={`Property ${index + 1}`}
                          className="h-full min-w-[150px] object-cover rounded-lg cursor-pointer"
                        />
                      ))
                    ) : (
                      <p className="text-gray-400">No image available</p>
                    )}
                  </div>
                </Link>
                <h2 className="text-lg font-semibold mt-2">{property.title}</h2>
                <p className="text-gray-400">Price: ₹{property.price}</p>

                {/* ✅ Show delete button only if the logged-in user is the owner */}
                {user && property.owner && String(user.id) === String(property.owner._id) && (
                  <button
                    onClick={() => handleDelete(property._id)}
                    className="mt-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-center">No properties found for this location.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Home;













  