import { handleRequest } from "./apiClient";
import { privateAxios } from "./helper";

// ------------------ CREATE ------------------
export const createManager = async (branchId, managerData) => {
  return handleRequest(() => privateAxios.post(`/managers/branch/${branchId}`, managerData), {
    onSuccessMessage: "Manager created successfully!",
    onErrorMessage: "Failed to create manager.",
  });
};

// ------------------ READ ------------------
export const loadAllManager = async () => {
  return handleRequest(() => privateAxios.get("/managers/"), {
    onSuccessMessage: "Managers loaded.",
    onErrorMessage: "Unable to load managers.",
  });
};

export const getManagerById = async (managerId) => {
  return handleRequest(() => privateAxios.get(`/managers/${managerId}`), {
    onErrorMessage: "Manager not found.",
  });
};

// ------------------ UPDATE ------------------
export const updateManagerApi = async (managerId, managerData) => {
  return handleRequest(() => privateAxios.put(`/managers/${managerId}`, managerData), {
    onSuccessMessage: "Manager updated successfully!",
    onErrorMessage: "Failed to update manager.",
  });
};

// ------------------ DELETE ------------------
export const deleteManagerApi = async (managerId) => {
  return handleRequest(() => privateAxios.delete(`/managers/${managerId}`), {
    onSuccessMessage: "Manager deleted successfully!",
    onErrorMessage: "Failed to delete manager.",
  });

};
