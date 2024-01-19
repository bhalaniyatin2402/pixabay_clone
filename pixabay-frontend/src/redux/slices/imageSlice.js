import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenModal: false,
  imageId: "",
  imageList: [],
};

const image = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImageDetailModal(state, action) {
      state.isOpenModal = action.payload;
    },
    setImageId(state, action) {
      state.imageId = action.payload;
    },
    updateImageList(state, action) {
      state.imageList = action.payload;
    },
    setEmptyImageList(state, action) {
      state.imageList = [];
    },
  },
});

export const {
  setImageDetailModal,
  setImageId,
  updateImageList,
  setEmptyImageList,
} = image.actions;
export default image.reducer;
