import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  snackbarOpen: false,
  snackbarType: "success",
  snackbarMessage: "",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setSnackbar: (state, action) => {
      const { snackbarOpen, snackbarMessage, snackbarType } = action.payload;
      return {
        ...state,
        snackbarOpen: snackbarOpen,
        snackbarType: snackbarType,
        snackbarMessage: snackbarMessage,
      };
    },
  },
});

export const { setSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
