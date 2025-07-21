import { useState } from "react";
import { useParams } from "react-router-dom";
import { createRider, createVehicle } from "../../../services/userlist";

function ChangeRoleToRider() {
    const { id } = useParams(); 

    const [vehicleData, setVehicleData] = useState({
        vehicleType: "",
        vehicleBrand: "",
        vehicleNumber: "",
        productionYear: "",
        categoryId: "1",
    });

    const [riderData, setRiderData] = useState({
        driver_License: "",
        date_Of_Birth: "",
        nid_No: "",
        citizen_No: "",
    });

    const handleChange = (e, setState) => {
        const { name, value } = e.target;
        setState((prev) => ({ ...prev, [name]: value }));
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

            const riderPayload = {
                driver_License: riderData.driver_License,
                date_Of_Birth: riderData.date_Of_Birth,
                nid_No: riderData.nid_No,
                citizen_No: riderData.citizen_No,
            };

            await createRider(id, vehicleData.categoryId, riderPayload);

            alert("Rider and Vehicle created successfully!");
        } catch (err) {
            console.error("Error:", err.response?.data || err.message);
            alert("Something went wrong!");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-6 max-w-xl mx-auto bg-white rounded shadow"
        >
            <h2 className="text-xl font-bold mb-4">Vehicle Information</h2>

            <input
                type="text"
                name="vehicleType"
                placeholder="Vehicle Type"
                value={vehicleData.vehicleType}
                onChange={(e) => handleChange(e, setVehicleData)}
                className="w-full border p-2 mb-3"
                required
            />
            <input
                type="text"
                name="vehicleBrand"
                placeholder="Vehicle Brand"
                value={vehicleData.vehicleBrand}
                onChange={(e) => handleChange(e, setVehicleData)}
                className="w-full border p-2 mb-3"
                required
            />
            <input
                type="text"
                name="vehicleNumber"
                placeholder="Vehicle Number"
                value={vehicleData.vehicleNumber}
                onChange={(e) => handleChange(e, setVehicleData)}
                className="w-full border p-2 mb-3"
                required
            />
            <input
                type="text"
                name="productionYear"
                placeholder="Production Year"
                value={vehicleData.productionYear}
                onChange={(e) => handleChange(e, setVehicleData)}
                className="w-full border p-2 mb-3"
                required
            />
            <input
                type="number"
                name="categoryId"
                placeholder="Category ID"
                value={vehicleData.categoryId}
                onChange={(e) => handleChange(e, setVehicleData)}
                className="w-full border p-2 mb-4"
                required
            />

            <h2 className="text-xl font-bold mb-4">Rider Information</h2>

            <input
                type="text"
                name="driver_License"
                placeholder="Driver License"
                value={riderData.driver_License}
                onChange={(e) => handleChange(e, setRiderData)}
                className="w-full border p-2 mb-3"
                required
            />
            <input
                type="date"
                name="date_Of_Birth"
                value={riderData.date_Of_Birth}
                onChange={(e) => handleChange(e, setRiderData)}
                className="w-full border p-2 mb-3"
                required
            />
            <input
                type="text"
                name="nid_No"
                placeholder="NID Number"
                value={riderData.nid_No}
                onChange={(e) => handleChange(e, setRiderData)}
                className="w-full border p-2 mb-3"
                required
            />
            <input
                type="text"
                name="citizen_No"
                placeholder="Citizenship No"
                value={riderData.citizen_No}
                onChange={(e) => handleChange(e, setRiderData)}
                className="w-full border p-2 mb-4"
                required
            />

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
                Submit
            </button>
        </form>
    );
}

export default ChangeRoleToRider;
