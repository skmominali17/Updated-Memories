import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./slices/postSlice";

const store = configureStore({
 reducer: {
    posts: postSlice,
 },
});

export default store;
