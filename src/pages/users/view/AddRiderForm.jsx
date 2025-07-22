// src/pages/rider/RiderForm.jsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import { createRider } from "../../../services/userlist";

function AddRiderForm() {
  const { id } = useParams();

  const [riderData, setRiderData] = useState({
    driver_License: "",
    date_Of_Birth: "",
    nid_No: "",
    citizen_No: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRiderData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const riderPayload = {
        driver_License: riderData.driver_License,
        date_Of_Birth: riderData.date_Of_Birth,
        nid_No: riderData.nid_No,
        citizen_No: riderData.citizen_No,
      };

      await createRider(id, "1", riderPayload); // Assuming default category is 1
      alert("Rider created successfully!");
    } catch (err) {
      console.error("Rider Error:", err.response?.data || err.message);
      alert("Rider creation failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Rider Information</h2>

      <input
        type="text"
        name="driver_License"
        placeholder="Driver License"
        value={riderData.driver_License}
        onChange={handleChange}
        className="w-full border p-2 mb-3"
        required
      />
      <input
        type="date"
        name="date_Of_Birth"
        value={riderData.date_Of_Birth}
        onChange={handleChange}
        className="w-full border p-2 mb-3"
        required
      />
      <input
        type="text"
        name="nid_No"
        placeholder="NID Number"
        value={riderData.nid_No}
        onChange={handleChange}
        className="w-full border p-2 mb-3"
        required
      />
      <input
        type="text"
        name="citizen_No"
        placeholder="Citizenship No"
        value={riderData.citizen_No}
        onChange={handleChange}
        className="w-full border p-2 mb-4"
        required
      />

      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
        Submit Rider Info
      </button>
    </form>
  );
}

export default AddRiderForm;
