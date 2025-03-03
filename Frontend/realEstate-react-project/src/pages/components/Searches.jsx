import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    type: "",
  });

  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    onSearch(search);
  };

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg flex gap-4">
      <input
        type="text"
        name="location"
        placeholder="Enter location"
        className="border p-2 rounded"
        onChange={handleChange}
      />
      <input
        type="number"
        name="minPrice"
        placeholder="Min Price"
        className="border p-2 rounded"
        onChange={handleChange}
      />
      <input
        type="number"
        name="maxPrice"
        placeholder="Max Price"
        className="border p-2 rounded"
        onChange={handleChange}
      />
      <select name="type" className="border p-2 rounded" onChange={handleChange}>
        <option value="">All Types</option>
        <option value="apartment">Apartment</option>
        <option value="house">House</option>
        <option value="villa">Villa</option>
      </select>
      <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
