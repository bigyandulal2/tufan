import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchVehicles } from "../../../redux/vehicleSlice";
import { fetchRiderImage } from "../../../redux/rider/ridersSlice";
import RenderImage from "./RiderImage";
import {
  retrieveRiderDetailsApi,
  updateRiderDetailsApi,
  uploadRiderFileApi,
  updateVehicleDetailsApi,
  uploadVehicleFileApi,
} from "../../../services/rider";

import {
  selectRiderImages,
} from '../../../redux/rider/riderSelectors';

export default function UpdateRider() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const vehiclesFromStore = useSelector((state) => state.vehicles.items || []);
  const riderImages = useSelector(selectRiderImages);
  const fetchedImagesRef = useRef(new Set());

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState(null);
  const [riderFormData, setRiderFormData] = useState({});
  const [documents, setDocuments] = useState({});
  const [vehiclesFormData, setVehiclesFormData] = useState([]);

  // Fetch rider details once id changes
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await retrieveRiderDetailsApi(id);
        setUserId(res.user?.id || null);
        setRiderFormData({
          date_Of_Birth: res.date_Of_Birth || "",
          driver_License: res.driver_License || "",
          nid_No: res.nid_No || "",
          citizen_No: res.citizen_No || "",
        });
        setDocuments({
          selfie: res.selfieWithIdCard || null,
          license: res.license_Image || null,
          citizen_front: res.citizen_Front || null,
          citizen_back: res.citizen_Back || null,
          nid: res.nid_Img || null,
        });
      } catch (err) {
        console.error("Failed to load rider", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // Fetch vehicles after getting userId
  useEffect(() => {
    if (userId) dispatch(fetchVehicles(userId));
  }, [userId, dispatch]);

  // Prepare vehicles form data when vehicles update
  useEffect(() => {
    setVehiclesFormData(
      vehiclesFromStore.length
        ? vehiclesFromStore.map((v) => ({
            vehicleType: v.vehicleType || "",
            vehicleBrand: v.vehicleBrand || "",
            vehicleNumber: v.vehicleNumber || "",
            productionYear: v.productionYear?.split("T")[0] || "",
            billBook1: null,
            billBook2: null,
            vehicleImg: null,
            id: v.id || null,
          }))
        : [
            {
              vehicleType: "",
              vehicleBrand: "",
              vehicleNumber: "",
              productionYear: "",
              billBook1: null,
              billBook2: null,
              vehicleImg: null,
              id: null,
            },
          ]
    );
  }, [vehiclesFromStore]);

  // Fetch rider document images via Redux if not cached
  useEffect(() => {
    if (loading) return; // wait until rider data loaded

    Object.values(documents).forEach((doc) => {
      // Only fetch if doc is string (filename), not null and not already fetched
      if (
        typeof doc === "string" &&
        !riderImages[doc] &&
        !fetchedImagesRef.current.has(doc)
      ) {
        fetchedImagesRef.current.add(doc);
        dispatch(fetchRiderImage(doc));
      }
    });
  }, [documents, riderImages, dispatch, loading]);

  const handleChange = (setter) => (e) => {
    const { name, value, files } = e.target;
    setter((prev) => ({ ...prev, [name]: files?.[0] || value }));
  };

  const handleVehicleChange = (index, e) => {
    const { name, value, files } = e.target;
    setVehiclesFormData((prev) =>
      prev.map((v, i) => (i === index ? { ...v, [name]: files?.[0] || value } : v))
    );
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await updateRiderDetailsApi(id, riderFormData);

      for (const [fileType, file] of Object.entries(documents)) {
        if (file instanceof File) {
          await uploadRiderFileApi(id, file, fileType);
        }
      }

      for (const vehicle of vehiclesFormData) {
        await updateVehicleDetailsApi(vehicle.id, {
          vehicleType: vehicle.vehicleType,
          vehicleBrand: vehicle.vehicleBrand,
          vehicleNumber: vehicle.vehicleNumber,
          productionYear: vehicle.productionYear,
        });

        for (const key of ["billBook1", "billBook2", "vehicleImg"]) {
          if (vehicle[key] instanceof File) {
            await uploadVehicleFileApi(vehicle.id, vehicle[key], key);
          }
        }
      }

      alert("Rider and vehicles updated successfully.");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update rider or vehicles.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      <h1 className="text-2xl font-bold text-center">Update Rider</h1>

      {/* Rider Details */}
      <div className="bg-white p-6 border rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Rider Details</h2>
        {["date_Of_Birth", "driver_License", "nid_No", "citizen_No"].map((f) => (
          <div key={f} className="mb-4">
            <label className="block text-sm mb-1 capitalize">{f}</label>
            <input
              type={f === "date_Of_Birth" ? "date" : "text"}
              name={f}
              value={riderFormData[f] || ""}
              onChange={handleChange(setRiderFormData)}
              className="border p-2 rounded w-full"
            />
          </div>
        ))}
      </div>

      {/* Rider Documents */}
      <div className="bg-white p-6 border rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Upload Rider Documents</h2>
        {["selfie", "license", "citizen_front", "citizen_back", "nid"].map((f) => (
          <div key={f} className="mb-4">
            <label className="block text-sm mb-1 capitalize">{f}</label>
            <input
              type="file"
              name={f}
              onChange={handleChange(setDocuments)}
              className="border p-2  w-full"
            />
            {documents[f] && (
              <div className="mt-2 flex items-center space-x-2">
                {typeof documents[f] === "string" ? (
                  <RenderImage imageUrl={riderImages[documents[f]]} />
                ) : (
                  <img
                    src={URL.createObjectURL(documents[f])}
                    alt={`${f} preview`}
                    className="h-36 w-36 object-cover rounded-md"
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Vehicle Info */}
      <div className="bg-white p-6 border rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Vehicle Info</h2>
        {vehiclesFormData.map((v, i) => (
          <div
            key={i}
            className="grid grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded border"
          >
            {["vehicleType", "vehicleBrand", "vehicleNumber"].map((f) => (
              <div key={f}>
                <label className="block text-sm mb-1 capitalize">{f}</label>
                <input
                  name={f}
                  value={v[f]}
                  onChange={(e) => handleVehicleChange(i, e)}
                  className="border p-2 rounded w-full"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm mb-1">Production Year</label>
              <input
                type="date"
                name="productionYear"
                value={v.productionYear}
                onChange={(e) => handleVehicleChange(i, e)}
                className="border p-2 rounded w-full"
              />
            </div>

            {["billBook1", "billBook2", "vehicleImg"].map((f) => (
              <div key={f}>
                <label className="block text-sm mb-1 capitalize">{f}</label>
                <input
                  type="file"
                  name={f}
                  onChange={(e) => handleVehicleChange(i, e)}
                  className="border p-2 rounded w-full"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-800"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
