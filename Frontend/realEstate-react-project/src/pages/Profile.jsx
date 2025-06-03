import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;   

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(`${API_BASE_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok) {
          setUser(data.user);
          setProperties(data.properties);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  // Handle File Upload
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadProfilePic = async () => {
    if (!selectedFile) return alert("Please select an image");

    const formData = new FormData();
    formData.append("profilePic", selectedFile);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE_URL}/api/profile/upload-profile-pic`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        alert("Profile picture updated!");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  text-black px-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-6">My Profile</h1>

        {user ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Profile Image Section */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-400 shadow-lg">
                <img
                  src={`${API_BASE_URL}${user.profilePic}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                className="text-sm mt-1"
                onChange={handleFileChange}
              />
              <button
                className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md text-white"
                onClick={uploadProfilePic}
              >
                Upload Picture
              </button>
            </div>

            {/* User Details */}
            <div className="space-y-2 text-lg">
              <p><span className="font-semibold">Name:</span> {user.name}</p>
              <p><span className="font-semibold">Email:</span> {user.email}</p>
              <p><span className="font-semibold">Phone:</span> {user.phone || "N/A"}</p>
              <p><span className="font-semibold">Role:</span> {user.role || "User"}</p>

              <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md mt-4">
                Edit Profile
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-center">Loading user details...</p>
        )}

        {/* My Properties */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">My Properties</h2>
          <div className="space-y-4">
            {properties.length > 0 ? (
              properties.map((property) => (
                <div
                  key={property._id}
                  className="bg-gray-700 p-4 rounded-lg shadow-md flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold text-white">{property.title}</h3>
                    <p className="text-sm text-gray-300">{property.location}</p>
                  </div>
                  <button
                    className="text-sm text-blue-400 hover:underline"
                    onClick={() => (window.location.href = `/property/${property._id}`)}
                  >
                    View
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No properties listed yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;




