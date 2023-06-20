import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const server = "https://adventurelust.onrender.com/api/v1";
const url = "https://adventurlust-backend.vercel.app/api/v1";

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

export const userProfileUpdate = createAsyncThunk(
    "user/updateProfile",
    async ({ name, email }, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(
                `${server}/updateprofile`,
                {
                    name,
                    email,
                },
                {
                    headers: {
                        "Content-type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            console.log(data);
            console.log(data.message);

            return data.message;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const changeUserPassword = createAsyncThunk(
    "user/updatePassword",
    async ({ oldPassword, newPassword }, { rejectWithValue }) => {
        console.log(oldPassword, newPassword);
        try {
            const { data } = await axios.put(
                `${server}/changepassword`,
                {
                    oldPassword,
                    newPassword,
                },
                {
                    headers: {
                        "Content-type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            console.log(data);
            console.log(data.message);

            return data.message;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const changeUserPicture = createAsyncThunk(
    "user/updatePicture",
    async (formdata, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(
                `${server}/updateprofilepicture`,
                formdata,
                {
                    headers: {
                        "Content-type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );

            console.log(data);
            console.log(data.message);

            return data.message;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const forgetUserPassword = createAsyncThunk(
    "user/forgetPassword",
    async ({ email }, { rejectWithValue }) => {
        console.log(email);
        try {
            const { data } = await axios.post(
                `${server}/forgotpassword`,
                {
                    email,
                },
                {
                    headers: {
                        "Content-type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            console.log(data);
            console.log(data.message);

            return data.message;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const resetUserPassword = createAsyncThunk(
    "user/resetPassword",
    async ({ token, password }, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(
                `${server}/resetpassword/${token}`,
                {
                    password,
                },
                {
                    headers: {
                        "Content-type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            console.log(data);
            console.log(data.message);

            return data.message;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const removeFromPlaylist = createAsyncThunk(
    "course/removeFromPlaylist",
    async (id, { rejectWithValue }) => {
        console.log(id);
        try {
            const { data } = await axios.delete(
                `${server}/removefromplaylist?id=${id}`,

                {
                    withCredentials: true,
                }
            );
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// ========================== ================= ========================== =========================
const profileSlice = createSlice({
    name: "userProfile",

    initialState: {
        loading: false,
        message: null,
        error: null,
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
        // ---------------> Update User Profile <-------------------
        //
        builder.addCase(userProfileUpdate.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(userProfileUpdate.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        });
        builder.addCase(userProfileUpdate.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        //
        // ---------------> CHANGE USER PASSWORD <-------------------
        //
        builder.addCase(changeUserPassword.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(changeUserPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        });
        builder.addCase(changeUserPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        //
        //
        //

        //
        // ---------------> CHANGE USER PICTURE <-------------------
        //
        builder.addCase(changeUserPicture.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(changeUserPicture.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        });
        builder.addCase(changeUserPicture.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        //
        //
        //

        //
        // ---------------> FORGET USER PASSWORD <-------------------
        //
        builder.addCase(forgetUserPassword.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(forgetUserPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        });
        builder.addCase(forgetUserPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        //
        //
        //

        //
        // ---------------> RESET USER PASSWORD <-------------------
        //
        builder.addCase(resetUserPassword.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(resetUserPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        });
        builder.addCase(resetUserPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        //
        //
        // ================     REMOVE FROM PLAYLIST     =====================
        //
        builder.addCase(removeFromPlaylist.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(removeFromPlaylist.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        });
        builder.addCase(removeFromPlaylist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        //
        //
        //
    },
});

export const { clearError, clearMessage } = profileSlice.actions;

export default profileSlice.reducer;
