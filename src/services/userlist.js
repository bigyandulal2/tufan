import { handleRequest } from "./apiClient";
import { privateAxios } from "./helper";

// ✅ Load all users 
export const loadAllUsers = async () => {
  return handleRequest(
    () => privateAxios.get("/users/"),
    {
      onSuccessMessage: "Users loaded successfully.",
      onErrorMessage: "Failed to load users.",
    }
  );
};

// ✅ Create Vehicle
export const createVehicle = async (userId, categoryId, payload) => {
  return handleRequest(
    () => privateAxios.post(`/vehicles/user/${userId}/category/${categoryId}`, payload),
    {
      onSuccessMessage: "Vehicle created successfully.",
      onErrorMessage: "Failed to create vehicle.",
    }
  );
};


// ✅ Create Rider (Change role to rider)
export const createRider = async (userId, categoryId, payload) => {
  return handleRequest(
    () => privateAxios.post(`/user/${userId}/category/${categoryId}/riders`, payload),
    {
      onSuccessMessage: "Rider created successfully.",
      onErrorMessage: "Failed to create rider.",
    }
  );
};

