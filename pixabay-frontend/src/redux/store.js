import { configureStore } from "@reduxjs/toolkit";
// slice imports
import authReducer from "./slices/authSlice";
import imageReducer from "./slices/imageSlice";
// service imports
import { authApi } from "./services/authApi";
import { pixabayApi } from "./services/pixabayApi";

const store = configureStore({
  reducer: {
    auth: authReducer,
    image: imageReducer,
    [authApi.reducerPath]: authApi.reducer,
    [pixabayApi.reducerPath]: pixabayApi.reducer,
  },
  devTools: import.meta.env.VITE_APP_NODE_ENV == 'development',
  middleware: (gDM) =>
    gDM().concat(authApi.middleware).concat(pixabayApi.middleware),
});

export default store;
