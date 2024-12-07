import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  _id: string;
  name: string;
  email: string;
}

const initialState: UserState = {
  _id: '',
  name: '',
  email: '',
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<{ _id: string; name: string; email: string }>) => {
      const { _id, name, email } = action.payload;
      state._id = _id;
      state.name = name;
      state.email = email;
    },
  },
});

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;
