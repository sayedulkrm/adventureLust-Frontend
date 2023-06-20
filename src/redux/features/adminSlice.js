import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

export const getAdminStats = createAsyncThunk(
    "admin/stats",
    async (arg, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${server}/admin/stats`, {
                withCredentials: true,
            });
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const createCourse = createAsyncThunk(
    "admin/createCourse",
    async (formData, { rejectWithValue }) => {
        console.log(formData);
        try {
            const { data } = await axios.post(
                `${server}/createcourse`,
                formData,
                {
                    headers: {
                        "Content-type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );

            return data.message;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteCourse = createAsyncThunk(
    "admin/deleteCourse",
    async (id, { rejectWithValue }) => {
        console.log(id);
        try {
            const { data } = await axios.delete(`${server}/course/${id}`, {
                withCredentials: true,
            });

            return data.message;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const addLecture = createAsyncThunk(
    "admin/addLecture",
    async ({ courseId, myForm }, { rejectWithValue }) => {
        console.log(courseId);
        console.log(myForm);
        try {
            const { data } = await axios.post(
                `${server}/course/${courseId}`,
                myForm,
                {
                    headers: {
                        "Content-type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );

            return data.message;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteLecture = createAsyncThunk(
    "admin/deleteLecture",
    async ({ courseId, lectureId }, { rejectWithValue }) => {
        console.log("MY CORRRR", courseId);
        console.log("MY LEEEEEXC", lectureId);
        try {
            const { data } = await axios.delete(
                `${server}/lecture?courseId=${courseId}&lectureId=${lectureId}`,

                {
                    withCredentials: true,
                }
            );

            return data.message;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getAllUsers = createAsyncThunk(
    "admin/getAllUsers",
    async (arg, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${server}/admin/users`, {
                withCredentials: true,
            });
            return data.users;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const updateUserRole = createAsyncThunk(
    "admin/updateUserRole",
    async (userId, { rejectWithValue }) => {
        console.log(userId);
        try {
            const { data } = await axios.put(
                `${server}/admin/user/${userId}`,
                {},
                {
                    withCredentials: true,
                }
            );
            return data.message;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteUser = createAsyncThunk(
    "admin/deleteUser",
    async (userId, { rejectWithValue }) => {
        console.log(userId);
        try {
            const { data } = await axios.delete(
                `${server}/admin/user/${userId}`,

                {
                    withCredentials: true,
                }
            );
            return data.message;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================

const adminSlice = createSlice({
    name: "admin",

    initialState: {
        loading: false,
        message: null,
        error: null,
        users: [],
        stats: [],
    },

    reducers: {
        clearAdminMessage: (state) => {
            state.message = null;
        },
        clearAdminError: (state) => {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        // ============================
        // ===========    ADMIN STATS      =================
        // ============================

        builder.addCase(getAdminStats.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAdminStats.fulfilled, (state, action) => {
            state.loading = false;
            state.stats = action.payload.stats;
            state.usersCount = action.payload.usersCount;
            state.subscriptionCount = action.payload.subscriptionCount;
            state.viewsCount = action.payload.viewsCount;
            state.usersPercentage = action.payload.usersPercentage;
            state.usersProfit = action.payload.usersProfit;
            state.viewsPercentage = action.payload.viewsPercentage;
            state.viewsProfit = action.payload.viewsProfit;
            state.subscriptionProfit = action.payload.subscriptionProfit;
            state.subscriptionPercentage =
                action.payload.subscriptionPercentage;
        });
        builder.addCase(getAdminStats.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        // ============================
        // ===========    CREATE COURSE      =================
        // ============================

        builder.addCase(createCourse.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createCourse.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        });
        builder.addCase(createCourse.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // ============================
        // ===========    DELETE COURSE      =================
        // ============================

        builder.addCase(deleteCourse.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteCourse.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        });
        builder.addCase(deleteCourse.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        // ============================
        // ===========    ADD LECTURE         =================
        // ============================
        builder.addCase(addLecture.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addLecture.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        });
        builder.addCase(addLecture.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        // ============================
        // ===========   DELETE LECTURE      =================
        // ============================

        builder.addCase(deleteLecture.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteLecture.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        });
        builder.addCase(deleteLecture.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // ============================
        // ===========     GET ALL USERS     =================
        // ============================

        builder.addCase(getAllUsers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        });
        builder.addCase(getAllUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // ============================
        // ===========     UPDATE USER ROLE    =================
        // ============================
        builder.addCase(updateUserRole.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateUserRole.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        });
        builder.addCase(updateUserRole.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        // ============================
        // ===========    DELETE USER     =================
        // ============================
        builder.addCase(deleteUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        });
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        // ============================
        // ===========         =================
        // ============================
    },
});

export const { clearAdminMessage, clearAdminError } = adminSlice.actions;

export default adminSlice.reducer;
