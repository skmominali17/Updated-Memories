import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../src/interfaces/interfaces"

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [] as Post[]
  },
  reducers: {
    setAllPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    }
  }
})

export const { setAllPosts } = postSlice.actions;
export default postSlice.reducer