import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full p-4 z-50 ">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side - Website Name */}
        <div className="text-2xl font-extrabold text-blue-400">
  Easy Homes
</div>



        {/* Right Side - Navigation Links */}
        <div className="flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-red-500 font-medium">Home</Link>

          {isAuthenticated && (
            <Link to="/create-property" className="text-gray-700 hover:text-red-500 font-medium">Create Property</Link>
          )}

          {isAuthenticated ? (
           <Link to="/" onClick={handleLogout} className="text-gray-700 hover:text-red-500 font-medium cursor-pointer">Logout</Link>

          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-red-500 font-medium">Login</Link>
              <Link to="/signup" className="text-gray-700 hover:text-red-500 font-medium">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;









