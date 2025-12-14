import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateRiderDetailsApi } from '../../services/rider';

import {
  loadAllRider,
  getRiderById,
  loadPendingRiders,
  getRiderImage,
} from '../../services/rider';

// 🔹 All Riders
export const fetchRiders = createAsyncThunk(
  'riders/fetchRiders',
  async (_, { rejectWithValue }) => {
    try {
      return await loadAllRider();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error fetching riders');
    }
  }
);

// 🔹 Rider By ID
export const fetchRiderById = createAsyncThunk(
  'riders/fetchRiderById',
  async (riderId, { rejectWithValue }) => {
    try {
      return await getRiderById(riderId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error fetching rider');
    }
  }
);

// 🔹 Pending Riders
export const fetchPendingRiders = createAsyncThunk(
  'riders/fetchPendingRiders',
  async (_, { rejectWithValue }) => {
    try {
      return await loadPendingRiders();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error fetching pending riders');
    }
  }
);




export const updateRiderDetails = createAsyncThunk(
  'riders/updateRiderDetails',
  async ({ riderId, data }, { rejectWithValue }) => {
    try {
      return await updateRiderDetailsApi(riderId, data);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error updating rider');
    }
  }
);


// 🔹 Rider Image
export const fetchRiderImage = createAsyncThunk(
  'riders/fetchRiderImage',
  async (fileName, { rejectWithValue }) => {
    try {
      const imageUrl = await getRiderImage(fileName);
      return { fileName, imageUrl };
    } catch {
      return rejectWithValue({ fileName, error: 'Error loading rider image' });
    }
  }
);

// 🔹 Slice
const ridersSlice = createSlice({
  name: 'riders',
  initialState: {
    items: [],
    pendingItems: [],
    selectedRider: null,
    currentPage:1,
    status: 'idle',
    pendingRidersStatus: 'idle',
    error: null,

    imageUrls: {},
    imageStatuses: {},
    imageErrors: {},
  },
  reducers: {
    clearRiders: (state) => {
      state.items = [];
      state.pendingItems = [];
      state.selectedRider = null;
      state.status = 'idle';
      state.pendingRidersStatus = 'idle';
      state.error = null;
      state.imageUrls = {};
      state.imageStatuses = {};
      state.imageErrors = {};
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // All Riders
      .addCase(fetchRiders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRiders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchRiders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Rider by ID
      .addCase(fetchRiderById.pending, (state) => {
        state.status = 'loading';
        state.selectedRider = null;
      })
      .addCase(fetchRiderById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedRider = action.payload;
      })
      .addCase(fetchRiderById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Pending Riders
      .addCase(fetchPendingRiders.pending, (state) => {
        state.pendingRidersStatus = 'loading';
      })
      .addCase(fetchPendingRiders.fulfilled, (state, action) => {
        state.pendingRidersStatus = 'succeeded';
        state.pendingItems = action.payload;
      })
      .addCase(fetchPendingRiders.rejected, (state, action) => {
        state.pendingRidersStatus = 'failed';
        state.error = action.payload;
      })

      // Rider Image
      .addCase(fetchRiderImage.pending, (state, action) => {
        const fileName = action.meta.arg;
        state.imageStatuses[fileName] = 'loading';
      })
      .addCase(fetchRiderImage.fulfilled, (state, action) => {
        const { fileName, imageUrl } = action.payload;
        state.imageUrls[fileName] = imageUrl;
        state.imageStatuses[fileName] = 'succeeded';
      })
      .addCase(fetchRiderImage.rejected, (state, action) => {
        const { fileName, error } = action.payload;
        state.imageStatuses[fileName] = 'failed';
        state.imageErrors[fileName] = error;
      });
  },
});

export const { clearRiders,setCurrentPage } = ridersSlice.actions;
export default ridersSlice.reducer;
