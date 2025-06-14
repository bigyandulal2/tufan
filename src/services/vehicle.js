import { handleRequest } from "./apiClient";
import { privateAxios } from "./helper";

export const loadAllVehicle = async (userId) => {
  return handleRequest(() => privateAxios.get(`/vehicles/user/${userId}/`), {
    onSuccessMessage: " loaded.",
    onErrorMessage: "Unable to Vehical Riders.",
  });
};


// ✅ Load rider image
export const getVehicleImage = async (fileName) => {
  try {
    const response = await privateAxios.get(`/vehicles/image/${fileName}`, {
      responseType: 'blob',
    });
    return URL.createObjectURL(response.data);
  } catch (error) {
    // Not using handleRequest here because we return blob
    throw new Error("Failed to load rider image.");
  }
};