import { notifyError } from "../utils/notify";
import { handleRequest } from "./apiClient";
import { privateAxios } from "./helper";

// ------------------ CREATE ------------------
/*export const createBranch = async (branchData) => {
  return handleRequest(() => privateAxios.post("/branches/", branchData), {
    onSuccessMessage: "Branch created successfully!",
    onErrorMessage: "Failed to create branch.",
  });
};*/
export const createBranch = async (branchData) => {
  try {
    const response = await privateAxios.post("/branches/", branchData);
    console.log("Branch created successfully!");
    return response;
  } catch (error) {
    // Extract message from backend response if available
    const errorMsg =
      error?.response?.data?.message || "Something went wrong. Please try again.";

    notifyError(errorMsg); // show the exact error message
    throw error; // optionally rethrow
  }
};



// ------------------ READ ------------------
export const loadAllBranch = async () => {
  return handleRequest(() => privateAxios.get("/branches/"), {
    onSuccessMessage: "Branches loaded.",
    onErrorMessage: "Unable to load branches.",
  });
};

export const getBranchById = async (branchId) => {
  return handleRequest(() => privateAxios.get(`/branches/${branchId}`), {
    onErrorMessage: "Branch not found.",
  });
};

// ------------------ UPDATE ------------------
export const updateBranchApi = async (branchId, branchData) => {
  return handleRequest(() => privateAxios.put(`/branches/${branchId}`, branchData), {
    onSuccessMessage: "Branch updated successfully!",
    onErrorMessage: "Failed to update branch.",
  });
};

// ------------------ DELETE ------------------
export const deleteBranchApi = async (branchId) => {
  return handleRequest(() => privateAxios.delete(`/branches/${branchId}`), {
    onSuccessMessage: "Branch deleted successfully!",
    onErrorMessage: "Failed to delete branch.",
  });
};
