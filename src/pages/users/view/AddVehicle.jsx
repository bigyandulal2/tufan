import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createVehicle, getRiderVehicleData } from "../../../services/userlist";
import { uploadVehicleFileApi } from "../../../services/rider";

function VehicleForm() {
  const { id } = useParams();
  const [vehicleID, setVehicleID] = useState(null);
  const [isVehicleCreated, setIsVehicleCreated] = useState(false);

  const [vehicleData, setVehicleData] = useState({
    vehicleType: "",
    vehicleBrand: "",
    vehicleNumber: "",
    productionYear: "",
    categoryId: "1",
  });

  const [fileData, setFileData] = useState({
    billBook1: null,
    billBook2: null,
    VehicleImg: null,
  });

  useEffect(() => {
    async function fetchRiderData() {
      try {
        const { vehicle } = await getRiderVehicleData(id);
        if (vehicle?.id) {
          setVehicleID(vehicle.id);
          setIsVehicleCreated(true);
          alert("Vehicle already exists. You can upload documents.");
        }
      } catch (err) {
        console.error("Vehicle fetch failed:", err);
      }
    }
    fetchRiderData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVehicleChange = (e) => {
    const { name, files } = e.target;
    setFileData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
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

      const response = await createVehicle(id, vehicleData.categoryId, vehiclePayload);
      const newVehicleId = response?.id || response?.vehicleId;

      setVehicleID(newVehicleId);
      setIsVehicleCreated(true);
      alert("Vehicle created successfully!");
    } catch (err) {
      console.error("Vehicle creation error:", err.response?.data || err.message);
      alert("Vehicle creation failed!");
    }
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    if (!vehicleID) return;

    try {
      const uploads = [];

      if (fileData.billBook1)
        uploads.push(uploadVehicleFileApi(vehicleID, fileData.billBook1, "billBook1"));
      if (fileData.billBook2)
        uploads.push(uploadVehicleFileApi(vehicleID, fileData.billBook2, "billBook2"));
      if (fileData.VehicleImg)
        uploads.push(uploadVehicleFileApi(vehicleID, fileData.VehicleImg, "vehicleImg"));

      await Promise.all(uploads);
      alert("All files uploaded successfully!");
    } catch (err) {
      console.error("File upload error:", err);
      alert("Failed to upload some or all files.");
    }
  };

  return (
    <div>
      {/* Vehicle Creation Form */}
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
          Submit Vehicle
        </button>
      </form>

      {/* File Upload Form */}
      <form onSubmit={handleFileSubmit} className="p-6 max-w-xl mx-auto bg-white rounded shadow mt-6">
        <h2 className="text-xl font-bold mb-4">Upload Vehicle Documents</h2>

        <label className="block text-sm mb-1 capitalize">Billbook 1</label>
        <input
          type="file"
          name="billBook1"
          disabled={!isVehicleCreated}
          onChange={handleVehicleChange}
          accept=".jpg,.jpeg,.png,.pdf"
          className="border p-2 rounded w-full mb-3"
        />

        <label className="block text-sm mb-1 capitalize">Billbook 2</label>
        <input
          type="file"
          name="billBook2"
          disabled={!isVehicleCreated}
          onChange={handleVehicleChange}
          accept=".jpg,.jpeg,.png,.pdf"
          className="border p-2 rounded w-full mb-3"
        />

        <label className="block text-sm mb-1 capitalize">Vehicle Image</label>
        <input
          type="file"
          name="VehicleImg"
          disabled={!isVehicleCreated}
          onChange={handleVehicleChange}
          accept=".jpg,.jpeg,.png"
          className="border p-2 rounded w-full mb-3"
        />

        <button
          type="submit"
          disabled={!isVehicleCreated}
          className={`w-full py-2 rounded ${
            isVehicleCreated
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
        >
          Upload Documents
        </button>

        {!isVehicleCreated && (
          <div className="mt-4 text-sm text-red-600">
            Please submit Your vehicle information
          </div>
        )}
      </form>
    </div>
  );
}

export default VehicleForm;
