import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const server = "https://adventurelust.onrender.com/api/v1";
const url = "https://adventurlust-backend.vercel.app/api/v1";

//  <==============================================>
//  <==============================================>
//  <==============================================>
//  <==============================================>
//  <==============================================>

export const buySubscription = createAsyncThunk(
    "user/buysubscription",
    async (arg, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${server}/subscribe`, {
                withCredentials: true,
            });

            console.log(data);

            return data.subscriptionId;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const cancleSubscription = createAsyncThunk(
    "user/canclesubscription",
    async (arg, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`${server}/subscribe/cancel`, {
                withCredentials: true,
            });

            console.log(data);

            const message = data.message;

            console.log(message);
            return message;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

//  <==============================================>
//  <==============================================>
//  <==============================================>

const subscriptionSlice = createSlice({
    name: "subscription",
    initialState: {
        loading: false,
        subscriptionId: null,
        error: null,
        message: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },

        clearMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        //  <==============================================>
        //  <====================  BUY SUBSCRIPTION         ==========================>
        //  <==============================================>
        builder.addCase(buySubscription.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(buySubscription.fulfilled, (state, action) => {
            state.loading = false;
            state.subscriptionId = action.payload;
        });
        builder.addCase(buySubscription.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        //  <==============================================>
        //  <==============================================>
        //  <====================  CANCLE SUBSCRIPTION         ==========================>
        //  <==============================================>
        builder.addCase(cancleSubscription.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(cancleSubscription.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        });
        builder.addCase(cancleSubscription.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        //  <==============================================>
        //  <==============================================>
        //  <==============================================>
    },
});

export const { clearError, clearMessage } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
