import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./slices/postSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
 reducer: {
    posts: postSlice,
    user: userSlice
 },
});

export default store;
