import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  useEffect(() => {
    // Map initialize
    const map = L.map("map").setView([28.6139, 77.2090], 12); // Default: Delhi

    // OpenStreetMap tiles add karna
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Marker add karna
    L.marker([28.6139, 77.2090])
      .addTo(map)
      .bindPopup("This is Delhi")
      .openPopup();

    return () => {
      map.remove(); // Cleanup on unmount
    };
  }, []);

  return <div id="map" className="z-0 relative mt-20 w-full h-[500px]" />;
};

export default MapComponent;



