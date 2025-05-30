import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loadAllPrice } from '../services/price';


// 🔹 All Riders
export const fetchPrices = createAsyncThunk(
  'price/fetchPrices',
  async (_, { rejectWithValue }) => {
    try {
      return await loadAllPrice();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error fetching Price');
    }
  }
);



// 🔹 Pending Riders


// 🔹 Rider Image


// 🔹 Slice
const pricesSlice = createSlice({
  name: 'prices',
  initialState: {
    items: [],
    pendingItems: [],
    selectedRider: null,

    status: 'idle',
    pendingPricesStatus: 'idle',
    error: null,

    imageUrls: {},
    imageStatuses: {},
    imageErrors: {},
  },
  reducers: {
    clearPrices: (state) => {
      state.items = [];
      state.pendingItems = [];
      state.selectedRider = null;
      state.status = 'idle';
      state.pendingPricesStatus = 'idle';
      state.error = null;
      state.imageUrls = {};
      state.imageStatuses = {};
      state.imageErrors = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // All Prices
      .addCase(fetchPrices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPrices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPrices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

    // Rider by ID

  },
});

export const { clearPrices } = pricesSlice.actions;
export default pricesSlice.reducer;
