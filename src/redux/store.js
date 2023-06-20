import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./features/userSlice";
import profileSliceReducer from "./features/profileSlice";
import courseSliceReducer from "./features/courseSlice";
import subscriptionSliceReducer from "./features/subscriptionSlice";
import adminSliceReducer from "./features/adminSlice";
import otherSliceReducer from "./features/otherSlice";

const store = configureStore({
    reducer: {
        user: userSliceReducer,
        profile: profileSliceReducer,
        course: courseSliceReducer,
        subscription: subscriptionSliceReducer,
        admin: adminSliceReducer,
        other: otherSliceReducer,
    },
});

export default store;
