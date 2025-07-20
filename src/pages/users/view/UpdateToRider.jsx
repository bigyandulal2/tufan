import { useState } from "react";
import axios from "axios";

function UpdateToRider({ userId }) {
  const [formData, setFormData] = useState({
    vehicleType: "",
    vehicleBrand: "",
    vehicleNumber: "",
    productionYear: "",
    categoryId: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        vehicleType: formData.vehicleType,
        vehicleBrand: formData.vehicleBrand,
        vehicleNumber: formData.vehicleNumber,
        productionYear: formData.productionYear,
        category: {
          categoryId: parseInt(formData.categoryId)
        }
      };

      const confirmChange = window.confirm("Are you sure you want to change this user's role to Rider?");
      if (!confirmChange) return;

      try {
        const response = await changeRoleToRider(userId);
        alert("User role changed to Rider successfully!");
      } catch (error) {
        if (error.response) {
          console.error("Detailed error:", error.response.data);
          alert(
            error.response.data.message ||
            error.response.data.error ||
            "Request failed: Bad data or missing fields."
          );
        } else {
          console.error("Unknown error:", error);
          alert("Something went wrong. Please try again.");
        }
      }

      alert("Rider successfully registered!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
      alert("Failed to register rider. Please check inputs.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Register Rider Vehicle</h2>

      <label className="block mb-2">
        Vehicle Type:
        <input
          type="text"
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
          className="w-full border p-2 rounded mt-1"
          required
        />
      </label>

      <label className="block mb-2">
        Vehicle Brand:
        <input
          type="text"
          name="vehicleBrand"
          value={formData.vehicleBrand}
          onChange={handleChange}
          className="w-full border p-2 rounded mt-1"
          required
        />
      </label>

      <label className="block mb-2">
        Vehicle Number:
        <input
          type="text"
          name="vehicleNumber"
          value={formData.vehicleNumber}
          onChange={handleChange}
          className="w-full border p-2 rounded mt-1"
          required
        />
      </label>

      <label className="block mb-2">
        Production Year:
        <input
          type="number"
          name="productionYear"
          value={formData.productionYear}
          onChange={handleChange}
          className="w-full border p-2 rounded mt-1"
          required
        />
      </label>

      <label className="block mb-4">
        Category ID:
        <input
          type="number"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="w-full border p-2 rounded mt-1"
          required
        />
      </label>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}

export default UpdateToRider;
