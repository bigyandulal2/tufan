// redux/usersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadAllUsers } from "../services/userlist";

// Async thunk
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const response = await loadAllUsers();
    return response;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
    fetched: false, // ⭐ CACHE FLAG
    currentPage: 1, // ✅ PERSISTED PAGE
  },
  reducers: {
    clearUsers: (state) => {
      state.users = [];
      state.fetched = false;
    },
    setCurrentPage: (state, action) => {
        state.currentPage = action.payload;
      },
    addBranchNamesToUsers: (state, action) => {
        const branchMap = action.payload;
    
        state.users = state.users.map(user => ({
          ...user,
          BranchName: branchMap[user.branchId] || "Unknown",
        }));
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
        state.fetched = true; // ✅ MARK AS CACHED
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearUsers,addBranchNamesToUsers,setCurrentPage } = usersSlice.actions;
export default usersSlice.reducer;
