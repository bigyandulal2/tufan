// src/pages/rider/VehicleForm.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createVehicle } from "../../../services/userlist";

function VehicleForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicleData, setVehicleData] = useState({
    vehicleType: "",
    vehicleBrand: "",
    vehicleNumber: "",
    productionYear: "",
    categoryId: "1",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const vehiclePayload = {
        vehicleType: vehicleData.vehicleType,
        vehicleBrand: vehicleData.vehicleBrand,
        vehicleNumber: vehicleData.vehicleNumber,
        productionYear: vehicleData.productionYear,
        category: {
          categoryId: parseInt(vehicleData.categoryId),
        },
      };

      await createVehicle(id, vehicleData.categoryId, vehiclePayload);
      alert("Vehicle created successfully!");
      navigate(`/rider-form/${id}`);
    } catch (err) {
      console.error("Vehicle Error:", err.response?.data || err.message);
      alert("Vehicle creation failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Vehicle Information</h2>

      <input
        type="text"
        name="vehicleType"
        placeholder="Vehicle Type"
        value={vehicleData.vehicleType}
        onChange={handleChange}
        className="w-full border p-2 mb-3"
        required
      />
      <input
        type="text"
        name="vehicleBrand"
        placeholder="Vehicle Brand"
        value={vehicleData.vehicleBrand}
        onChange={handleChange}
        className="w-full border p-2 mb-3"
        required
      />
      <input
        type="text"
        name="vehicleNumber"
        placeholder="Vehicle Number"
        value={vehicleData.vehicleNumber}
        onChange={handleChange}
        className="w-full border p-2 mb-3"
        required
      />
      <input
        type="text"
        name="productionYear"
        placeholder="Production Year"
        value={vehicleData.productionYear}
        onChange={handleChange}
        className="w-full border p-2 mb-3"
        required
      />
      <select
        name="categoryId"
        value={vehicleData.categoryId}
        onChange={handleChange}
        className="w-full border p-2 mb-4"
        required
      >
        <option value="" disabled>Select Category</option>
        <option value="1">Bike</option>
        <option value="2">Car</option>
      </select>

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Next: Rider Info
      </button>
    </form>
  );
}

export default VehicleForm;
