// src/store/branchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteManagerApi, getManagerById, loadAllManager } from '../../services/manager';

export const fetchManagers = createAsyncThunk(
  'managers/fetchManagers',
  async (_, { rejectWithValue }) => {
    try {
      const data = await loadAllManager();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error fetching managers");
    }
  }
);

export const fetchManagerById = createAsyncThunk(
  'managers/fetchManagerById',
  async (managerId, { rejectWithValue }) => {
    try {
      const data = await getManagerById(managerId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error fetching manager");
    }
  }
);


export const deleteManager = createAsyncThunk(
  'managers/deleteManager',
  async (managerId, { rejectWithValue }) => {
    try {
      await deleteManagerApi(managerId); // Ensure this API deletes the manager
      return managerId; // Return the ID for reducer to remove from state
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error deleting manager");
    }
  }
);

const managersSlice = createSlice({
  name: 'managers',
  initialState: {
    selectedManager: null,
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    clearManagers: (state) => {
      state.items = [];
      state.selectedManager = null;
      state.status = 'idle';
    },
    clearSelectedManager: (state) => {
      state.selectedManager = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchManagers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchManagers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchManagers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(fetchManagerById.pending, (state) => {
        state.status = 'loading';
        state.selectedManager = null;
      })
      .addCase(fetchManagerById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedManager = action.payload;
      })
      .addCase(fetchManagerById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.selectedManager = null;
      })

      .addCase(deleteManager.fulfilled, (state, action) => {
        state.items = state.items.filter((m) => m.managerId !== action.payload);
      })
      .addCase(deleteManager.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearManagers, clearSelectedManager } = managersSlice.actions;
export default managersSlice.reducer;
