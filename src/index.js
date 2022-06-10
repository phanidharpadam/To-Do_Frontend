import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import todosReducer from "./features/todosSlice";
import authReducer from "./features/authSlice";
import snackbarReducer from "./features/snackbarSlice";

const store = configureStore({
  reducer: {
    todos: todosReducer,
    auth: authReducer,
    snackbar: snackbarReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
