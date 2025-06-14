import { handleRequest } from "./apiClient";
import { privateAxios } from "./helper";

// ✅ Load all riders
export const loadAllRider = async () => {
  return handleRequest(() => privateAxios.get("/riders/"), {
    onSuccessMessage: "Riders loaded.",
    onErrorMessage: "Unable to load Riders.",
  });
};


// ✅ Load rider by ID
export const getRiderById = async (riderId) => {
  return handleRequest(() => privateAxios.get(`/riders/${riderId}`), {
    onErrorMessage: "Rider not found.",
  });
};



/*export const loadPendingRiders = async () => {
  try {
    const response = await privateAxios.get("/riders/pending")
    // process response
    return response.data;
  } catch (error) {
    console.error('Error loading pending riders:', error);
    if (error.response) {
      console.log('Backend returned:', error.response.data);
    }
  }

};*/

// ✅ Load only pending riders
export const loadPendingRiders = async () => {
  return handleRequest(() => privateAxios.get("/riders/pending"), {
    onSuccessMessage: "Pending riders loaded.",
    onErrorMessage: "Unable to load pending riders.",
    // fallbackOn500: { notifyMessage: "Loading from fallback..." } // optional
  });
};


// ✅ Update rider status (approve/reject general)
export const updateRiderStatusApi = async (id, status, msg = '') => {
  return handleRequest(() => privateAxios.put(`/${id}/rider`, { status, msg }), {
    onSuccessMessage: `Rider ${status} successfully.`,
    onErrorMessage: `Failed to ${status} rider.`,
  });
};

// ✅ Reject rider
export const rejectRiderApi = async (id, reason) => {
  if (!id) {
    throw new Error("Rider ID is not available.");
  }

  return handleRequest(() => privateAxios.put(`/${id}/reject`, {
    statusMessage: reason,
  }), {
    onSuccessMessage: "Rider rejected successfully.",
    onErrorMessage: "Failed to reject rider.",
  });
};

// ✅ Approve rider (with fallback for 500)
export const approveRiderApi = async (id) => {
  return handleRequest(() => privateAxios.put(`/${id}/approved`), {
    onSuccessMessage: "Rider approved successfully.",
    onErrorMessage: "Failed to approve rider.",
    fallbackOn500: {
      notifyMessage: "Rider likely approved, but backend returned error.",
    },
  });
};

// ✅ Delete rider
export const deleteRiderApi = async (id) => {
  return handleRequest(() => privateAxios.delete(`/rider/${id}`), {
    onSuccessMessage: "Rider deleted successfully.",
    onErrorMessage: "Failed to delete rider.",
  });
};

// ✅ Load rider image
export const getRiderImage = async (fileName) => {
  try {
    const response = await privateAxios.get(`/rider/image/${fileName}`, {
      responseType: 'blob',
    });
    return URL.createObjectURL(response.data);
  } catch (error) {
    // Not using handleRequest here because we return blob
    throw new Error("Failed to load rider image.");
  }
};





