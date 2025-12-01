import { toast } from "react-toastify";
import { privateAxios } from "../services/helper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const sendNotification = createAsyncThunk(
    "notification/sendNotification",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await privateAxios.post("/notification/broadcast", payload);

            toast.success("Notification sent successfully.");
            return res.data;
        } catch (error) {
            console.error("Notification error:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Server error");
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        loading: false,
        error: null,
        success: false,
        lastResponse: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendNotification.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(sendNotification.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.lastResponse = action.payload;
            })
            .addCase(sendNotification.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    },
});

export default notificationSlice.reducer;
