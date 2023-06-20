import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const server = "https://adventurelust.onrender.com/api/v1";
const url = "https://adventurlust-backend.vercel.app/api/v1";

// Login ===>
// Login ===>
// Login ===>
// Login ===>
// Login ===>
// Login ===>
// Login ===>
// Login ===>
// Login ===>
// Login ===>
// Login ===>

// Register ===>

export const userRegister = createAsyncThunk(
    "user/register",
    async (fromData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${server}/register`, fromData, {
                headers: {
                    "Content-type": "multipart/form-data",
                },
                withCredentials: true,
            });

            console.log(data);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// Login ===>

export const userLogin = createAsyncThunk(
    "user/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                `${server}/login`,
                { email, password },
                {
                    headers: {
                        "Content-type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            console.log(data);
            return data;

            // if (response.status === 200) {
            //     return result;
            // } else {
            //     return rejectWithValue(result.data.message);
            // }
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// Logout ===>

export const userLogout = createAsyncThunk(
    "user/logout",
    async (arg, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${server}/logout`, {
                withCredentials: true,
            });

            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// Get User Profile ===>

export const getUserProfile = createAsyncThunk(
    "user/profile",
    async (arg, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${server}/me`, {
                withCredentials: true,
            });

            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// =================================================================
// =================================================================
// =================================================================
// =================================================================

export const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        isAuthenticated: false,
        user: null,
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
        //
        //
        // ===================    USER Register      =================== //
        builder.addCase(userRegister.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(userRegister.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.message = action.payload.message;
        });

        builder.addCase(userRegister.rejected, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        });

        //
        //
        // ===================    USER LOGIN      =================== //
        builder.addCase(userLogin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.message = action.payload.message;
        });

        builder.addCase(userLogin.rejected, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        });

        //
        //
        // ===================    GET USER PROFILE      =================== //
        builder.addCase(getUserProfile.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        });

        builder.addCase(getUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        });

        //
        //
        // ===================    USER LOGOUT      =================== //
        builder.addCase(userLogout.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(userLogout.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.message = action.payload.message;
        });

        builder.addCase(userLogout.rejected, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;

            state.error = action.payload;
        });

        // ============================= //
    },
});

export const { clearError, clearMessage } = userSlice.actions;

export default userSlice.reducer;
