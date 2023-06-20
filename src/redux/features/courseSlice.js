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

export const getAllCourses = createAsyncThunk(
    "course/getCourse",
    async ({ category = "", keyword = "" }, { rejectWithValue }) => {
        console.log(category, keyword);
        try {
            const { data } = await axios.get(
                `${server}/courses?keyword=${keyword}&category=${category}`
            );
            console.log(data);

            return data.courses;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getSingleCourse = createAsyncThunk(
    "course/getSingleCourse",
    async (id, { rejectWithValue }) => {
        console.log(id);
        try {
            const { data } = await axios.get(`${server}/course/${id}`, {
                withCredentials: true,
            });
            console.log(data);

            return data.lectures;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const addToPlaylist = createAsyncThunk(
    "course/addToPlaylist",
    async (id, { rejectWithValue }) => {
        console.log(id);
        try {
            const { data } = await axios.post(
                `${server}/addtoplaylist`,
                { id },
                {
                    headers: {
                        "Content-type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// ======================      ===========================              ======================================

const courseSlice = createSlice({
    name: "course",
    initialState: {
        loading: false,
        courses: [],
        message: null,
        error: null,
        lectures: [],
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
        // ================     GET ALL COURSES     =====================
        //
        builder.addCase(getAllCourses.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            state.loading = false;
            state.courses = action.payload;
        });
        builder.addCase(getAllCourses.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        //
        //
        //

        //
        // ================     GET SPECFIC COURSES     =====================
        //
        builder.addCase(getSingleCourse.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getSingleCourse.fulfilled, (state, action) => {
            state.loading = false;
            state.lectures = action.payload;
        });
        builder.addCase(getSingleCourse.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        //
        //
        //

        //
        //
        //
        //
        // ================     ADD TO PLAYLIST     =====================
        //
        builder.addCase(addToPlaylist.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addToPlaylist.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        });
        builder.addCase(addToPlaylist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        //
        //
        //
        //
    },
});

export const { clearError, clearMessage } = courseSlice.actions;

export default courseSlice.reducer;
