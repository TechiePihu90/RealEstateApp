import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPropertyById } from "../services/Api";
import Slider from "react-slick"; // ✅ React Slick Import
import "slick-carousel/slick/slick.css"; // ✅ Slick Styles
import "slick-carousel/slick/slick-theme.css";
import MapComponent from "../pages/components/MapComponent"; 
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getPropertyById(id);
        console.log("Fetched Property Data:", data); 
        setProperty(data);
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) return <h2 className="text-center text-white">Loading...</h2>;

  // ✅ Slider Settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white text-black rounded-lg shadow-lg pt-20 ">
      {/* Property Title */}
      <h1 className="text-3xl font-bold mb-4 text-black">{property.title}</h1>

      {/* ✅ Image Slider */}
      <Slider {...settings} className="mb-6">
        {property.images.map((img, index) => (
          <div key={index}>
            <img
              console.log("Image URL:", `${API_BASE_URL}/${img}`);

              src={`${API_BASE_URL}/${img}`}
              alt={`Property ${index + 1}`}
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>
        ))}
      </Slider>

      {/* Property Details */}
      <p className="mt-4 text-black text-lg">{property.description}</p>
      <p className="mt-2 text-xl font-semibold text-black">Price: ₹{property.price}</p>
      <p className="mt-2 text-black text-lg">Location: {property.location}</p>

      {/* ✅ Leaflet.js OpenStreetMap Integration */}
      <div className="z=0  mt-8">
        <h2 className="text-xl font-semibold text-black">Location on Map</h2>
        <MapComponent latitude={property.latitude} longitude={property.longitude} />
      </div>



      {/* Owner Details */}
      <div className="mt-6 p-4 border border-black rounded-lg bg-gray-700">
        <h2 className="text-xl font-semibold text-white">Owner Details</h2>
        <p className="text-gray-300"><strong>Name:</strong> {property.owner.name}</p>
        <p className="text-gray-300"><strong>Phone:</strong> {property.owner.phone}</p>
        <p className="text-gray-300"><strong>Email:</strong> {property.owner.email}</p>

        {/* ✅ Call & Email Buttons */}
        <div className="mt-4 flex gap-4">
          {/* Call Button */}
          <a
            href={`tel:${property.owner.phone}`}
            className="bg-green-100 hover:bg-green-800 text-white font-bold px-4 py-2 rounded-lg flex items-center gap-2"
          >
            📞 Call Owner
          </a>

          {/* Email Button */}
          <a
            href={`mailto:${property.owner.email}`}
            className="bg-blue-100 hover:bg-blue-900 text-white font-bod px-4 py-2 rounded-lg flex items-center gap-2"
          >
            📧 Email Owner
          </a>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;








