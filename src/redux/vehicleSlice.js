import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getVehicleImage, loadAllVehicle } from '../services/vehicle';

// 🔹 Fetch all vehicles
export const fetchVehicles = createAsyncThunk(
  'vehicles/fetchVehicles',
  async (userId, { rejectWithValue }) => {
    try {
      return await loadAllVehicle(userId); // ✅ now passing userId
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error fetching vehicles');
    }
  }
);

// 🔹 Fetch vehicle image by filename
export const fetchVehicleImage = createAsyncThunk(
  'vehicles/fetchVehicleImage',
  async (fileName, { rejectWithValue }) => {
    try {
      const imageUrl = await getVehicleImage(fileName);
      return { fileName, imageUrl };
    } catch {
      return rejectWithValue({ fileName, error: 'Error loading vehicle image' });
    }
  }
);

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState: {
    items: [],
    selectedVehicle: null,  // keep if you want to select a vehicle later
    status: 'idle',
    error: null,
    imageUrls: {},
    imageStatuses: {},
    imageErrors: {},
  },
  reducers: {
    clearVehicles: (state) => {
      state.items = [];
      state.selectedVehicle = null;
      state.status = 'idle';
      state.error = null;
      state.imageUrls = {};
      state.imageStatuses = {};
      state.imageErrors = {};
    },
    clearSelectedVehicle: (state) => {
      state.selectedVehicle = null;
    },
    resetStatus: (state) => {
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch vehicles
      .addCase(fetchVehicles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Fetch vehicle image
      .addCase(fetchVehicleImage.pending, (state, action) => {
        const fileName = action.meta.arg;
        state.imageStatuses[fileName] = 'loading';
      })
      .addCase(fetchVehicleImage.fulfilled, (state, action) => {
        const { fileName, imageUrl } = action.payload;
        state.imageUrls[fileName] = imageUrl;
        state.imageStatuses[fileName] = 'succeeded';
      })
      .addCase(fetchVehicleImage.rejected, (state, action) => {
        const { fileName, error } = action.payload;
        state.imageStatuses[fileName] = 'failed';
        state.imageErrors[fileName] = error;
      });
  },
});

export const { clearVehicles, clearSelectedVehicle, resetStatus } = vehiclesSlice.actions;
export default vehiclesSlice.reducer;
