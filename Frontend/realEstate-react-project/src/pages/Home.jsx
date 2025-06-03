import { useEffect, useState } from "react";
import { getProperties, searchProperties, deleteProperty } from "../services/Api";
import { Link } from "react-router-dom";
import Footer from "./Footer";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Home = () => {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedInUser);

    fetchProperties();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const searchResults = await searchProperties(searchQuery);
      setProperties(searchResults);
    } catch (error) {
      console.error("Error searching properties:", error);
    }
  };

  const handleDelete = async (propertyId) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;

    try {
      await deleteProperty(propertyId);
      setProperties(properties.filter((p) => p._id !== propertyId));
      alert("Property deleted successfully!");
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("Failed to delete property.");
    }
  };

  return (
    <div className="text-white min-h-screen bg-#d9dce4">

      {/* ✅ Hero Section Start */}
      <div
        className="relative w-full h-screen   bg-center flex items-center justify-center mx-0 px-0 ">
       <img
    src="/house.png"
     
    alt="house"
    className="absolute top-0 w-full h-full z-0"
  />

        <div className=" bg-opacity-50 absolute top-0 left-0 w-full h-full"></div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Dream Home, Hassle-Free!
          </h1>
          <div className="flex justify-center">
            <input 
      
              type="text"
              placeholder="Search by location (e.g., Mansarovar)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-3 w-72 md:w-96 rounded-l-md text-black border border-white"
            />
            <button
              onClick={handleSearch}
              className="bg-red-600 px-6 py-3 rounded-r-md text-white hover:bg-red-700"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      {/* ✅ Hero Section End */}

      <div className="p-6">
        <h2 className="text-2xl text-black  font-bold my-4">Properties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {properties.length > 0 ? (
            properties.map((property) => (
              <div key={property._id} className="border p-4 rounded-lg text-black shadow-lg">
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
                      <p className="text-black">No image available</p>
                    )}
                  </div>
                </Link>
                <h2 className="text-lg font-semibold mt-2">{property.title}</h2>
                <p className="text-black">Price: ₹{property.price}</p>

                {user && property.owner && String(user.id) === String(property.owner._id) && (
                  <button
                    onClick={() => handleDelete(property._id)}
                    className="mt-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-center">No properties found for this location.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;













  
