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

// Rider pagination version 
export const getRidersPaginated = async ({ pageNumber = 0, pageSize = 10, sortBy = 'id', sortDir = 'asc' } = {}) => {
  return handleRequest(
    () =>
      privateAxios.get(
        `/riders?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
      ),
    {
      onErrorMessage: "Failed to fetch riders",
    }
  );
};
// get riders with paginated filterss
// Rider pagination with filters: status, categoryId, branchId
export const getRidersPaginatedWithFilters = async ({
  pageNumber = 0,
  pageSize = 10,
  sortBy = 'id',
  sortDir = 'asc',
  status,
  categoryId,
  branchId
} = {}) => {
  // Build query string dynamically
  const params = new URLSearchParams();
  params.append('pageNumber', pageNumber);
  params.append('pageSize', pageSize);
  params.append('sortBy', sortBy);
  params.append('sortDir', sortDir);

  if (status) params.append('status', status);
  if (categoryId) params.append('categoryId', categoryId);
  if (branchId) params.append('branchId', branchId);

  return handleRequest(
    () => privateAxios.get(`/riders?${params.toString()}`),
    {
      onErrorMessage: 'Failed to fetch riders',
    }
  );
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

  // ✅ Retrieve rider details
export const retrieveRiderDetailsApi = async (id) => {
  return handleRequest(() => privateAxios.get(`/riders/${id}`), {
    onSuccessMessage: "Rider details retrieved successfully.",
    onErrorMessage: "Failed to retrieve rider details.",
  });
}
  
// ✅ Update rider details
export const updateRiderDetailsApi = async (id, riderData) => {
  return handleRequest(() =>
    privateAxios.put(`/rider/${id}`, riderData),
    {
      onSuccessMessage: "Rider details updated successfully.",
      onErrorMessage: "Failed to update rider details.",
    }
  );
};

// ✅ Upload rider document
export const uploadRiderFileApi = async (riderId, file, fileType) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileType", fileType);

  return handleRequest(() =>
    privateAxios.post(`/rider/file/upload/${riderId}`, formData),
    {
      onSuccessMessage: `${fileType} uploaded.`,
      onErrorMessage: `Failed to upload ${fileType}.`,
    }
  );
};

// ✅ Update vehicle details
export const updateVehicleDetailsApi = async (vehicleId, vehicleData) => {
  return handleRequest(() =>
    privateAxios.put(`/vehicles/${vehicleId}`, vehicleData),
    {
      onSuccessMessage: "Vehicle details updated successfully.",
      onErrorMessage: "Failed to update vehicle details.",
    }
  );
};

// ✅ Upload vehicle file (bluebook1, bluebook2, vehicleImg)
export const uploadVehicleFileApi = async (vehicleId, file, type) => {
  const formData = new FormData();
  formData.append("file", file);

  const urlMap = {
    billBook1: "bluebook1",
    billBook2: "bluebook2",
    vehicleImg: "image",
  };

  return handleRequest(() =>
    privateAxios.post(`/vehicles/${urlMap[type]}/upload/${vehicleId}`, formData),
    {
      onSuccessMessage: `${type} uploaded.`,
      onErrorMessage: `Failed to upload ${type}.`,
    }
  );
};


// ✅ Revert rider status to pending
export const RevertRiderStatusApi = async (id) => {
  return handleRequest(() => privateAxios.put(`/${id}/makepending`), {
    onSuccessMessage: "Rider status reverted to pending.",
    onErrorMessage: "Failed to revert rider status.",
    fallbackOn500: {
      notifyMessage: "Status likely reverted, but backend returned an error.",
    },
  });
};




