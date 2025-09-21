import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import PropertyDetails from './pages/PropertyDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './pages/Navbar';
import CreateProperty from './pages/CreateProperty';
import Profile from "./pages/Profile";
import EstimatePrice from "./pages/EstimatedPrice";

import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create-property" element={<CreateProperty />} />  
        <Route path="/profile" element={<Profile />} />
        <Route path="/estimate-price" element={<EstimatePrice />} />

      </Routes>
    </Router>
  );
}

export default App;



