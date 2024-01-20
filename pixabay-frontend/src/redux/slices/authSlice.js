import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  username: localStorage.getItem("username") || "",
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload[0];
      state.username = action.payload[1];
    },
  },
});

export const { setIsLoggedIn } = AuthSlice.actions;
export default AuthSlice.reducer;
