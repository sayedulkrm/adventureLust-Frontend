import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const server = "https://adventurelust.onrender.com/api/v1";
const url = "https://adventurlust-backend.vercel.app/api/v1";

const config = {
    headers: {
        "Content-type": "application/json",
    },
    withCredentials: true,
};

//                      <=========================>
//                      <=========================>
//                      <=========================>
//                      <=========================>
//                      <=========================>
//                      <=========================>
//                      <=========================>
//                      <=========================>
//                      <=========================>
//                      <=========================>
//                      <=========================>

export const contactUs = createAsyncThunk(
    "contact",
    async ({ name, email, message }, { rejectWithValue }) => {
        console.log(name, email, message);
        try {
            const { data } = await axios.post(
                `${server}/contact`,
                { name, email, message },
                config
            );
            return data.message;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const requestCourse = createAsyncThunk(
    "requestCourse",
    async ({ name, email, course }, { rejectWithValue }) => {
        console.log(name, email, course);

        try {
            const { data } = await axios.post(
                `${server}/courserequest`,
                { name, email, course },
                config
            );
            return data.message;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const otherSlice = createSlice({
    name: "other",
    initialState: {
        loading: false,
        error: null,
        otherMessage: null,
    },
    reducers: {
        clearOtherError: (state) => {
            state.error = null;
        },
        clearOtherMessage: (state) => {
            state.otherMessage = null;
        },
    },

    extraReducers: (builder) => {
        // Contact US

        builder.addCase(contactUs.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(contactUs.fulfilled, (state, action) => {
            state.loading = false;
            state.otherMessage = action.payload;
        });

        builder.addCase(contactUs.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Request Course

        builder.addCase(requestCourse.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(requestCourse.fulfilled, (state, action) => {
            state.loading = false;
            state.otherMessage = action.payload;
        });

        builder.addCase(requestCourse.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { clearOtherError, clearOtherMessage } = otherSlice.actions;

export default otherSlice.reducer;
