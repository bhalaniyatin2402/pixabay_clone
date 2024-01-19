import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      return state.isLoggedIn = action.payload
    }
  },
});

export const { setCredentials } = AuthSlice.actions;
export default AuthSlice.reducer;
