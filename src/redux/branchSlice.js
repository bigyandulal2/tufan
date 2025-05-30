// src/store/branchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBranchById, loadAllBranch } from '../services/branch';

// Fetch all branches
export const fetchBranches = createAsyncThunk(
  'branches/fetchBranches',
  async (_, { rejectWithValue }) => {
    try {
      const data = await loadAllBranch();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error fetching branches");
    }
  }
);

// Fetch branch by ID
export const fetchBranchById = createAsyncThunk(
  'branches/fetchBranchById',
  async (branchId, { rejectWithValue }) => {
    try {
      const data = await getBranchById(branchId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error fetching branch");
    }
  }
);

// Create branch
export const createNewBranch = createAsyncThunk(
  'branches/createNewBranch',
  async (branchData, { rejectWithValue }) => {
    try {
      const data = await createBranch(branchData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error creating branch");
    }
  }
);

// Delete branch
export const deleteBranch = createAsyncThunk(
  'branches/deleteBranch',
  async (branchId, { rejectWithValue }) => {
    try {
      await deleteBranchById(branchId);
      return branchId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error deleting branch");
    }
  }
);

const branchSlice = createSlice({
  name: 'branches',
  initialState: {
    selectedBranch: null,
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    clearBranches: (state) => {
      state.items = [];
      state.selectedBranch = null;
      state.status = 'idle';
    },
    clearSelectedBranch: (state) => {
      state.selectedBranch = null;
    },
    resetStatus: (state) => {
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch branches
      .addCase(fetchBranches.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBranches.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(fetchBranches.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Fetch branch by ID
      .addCase(fetchBranchById.pending, (state) => {
        state.status = 'loading';
        state.selectedBranch = null;
      })
      .addCase(fetchBranchById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedBranch = action.payload;
      })
      .addCase(fetchBranchById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.selectedBranch = null;
      })

      // Create branch
      .addCase(createNewBranch.fulfilled, (state) => {
        state.status = 'created';
      })

      // Delete branch
      .addCase(deleteBranch.fulfilled, (state) => {
        state.status = 'deleted';
      });
  },
});

export const { clearBranches, clearSelectedBranch, resetStatus } = branchSlice.actions;
export default branchSlice.reducer;