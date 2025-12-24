import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsersPaginatedWithFilters } from "../services/userlist";

// Fetch paginated users with branch and keyword filters
export const fetchPaginatedUsers = createAsyncThunk(
  "users/fetchPaginatedUsers",
  async (
    {
      pageNumber = 0,
      pageSize = 10,
      sortBy = "name",
      sortDir = "asc",
      keyword = "",
      branchId = "",
    } = {},
    { rejectWithValue }
  ) => {
    try {
      const response = await getUsersPaginatedWithFilters({
        pageNumber,
        pageSize,
        sortBy,
        sortDir,
        keyword,
        branchId,
      });
      return response; // full API response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching users"
      );
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
    fetched: false,
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    totalElements: 0,
    branch: "", // current branch filter
    keyword: "", // current search keyword
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilterBranch: (state, action) => {
      state.branch = action.payload; // fix mismatch
    },
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    addBranchNamesToUsers: (state, action) => {
      const branchMap = action.payload;
      state.users = state.users.map((user) => ({
        ...user,
        BranchName: branchMap[user.branchId] || "Unknown",
      }));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaginatedUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPaginatedUsers.fulfilled, (state, action) => {
        const data = action.payload;
        state.users = data.content || [];
        state.totalPages = data.totalPages || 1;
        state.pageSize = data.pageSize || 10;
        state.totalElements = data.totalElements || 0;
        state.currentPage = (data.pageNumber || 0) + 1;
        state.loading = false;
        state.fetched = true;
      })
      .addCase(fetchPaginatedUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const {
  setCurrentPage,
  addBranchNamesToUsers,
  setFilterBranch,
  setKeyword,
} = usersSlice.actions;
export default usersSlice.reducer;
