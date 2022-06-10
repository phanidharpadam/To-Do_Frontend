import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./api";

const initialState = {
  token: localStorage.getItem("token"),
  email: "",
  username: "",
  id: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/auth/local/register`, {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.userName,
        email: user.email,
        password: user.password,
      });

      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/auth/local`, {
        identifier: user.email,
        password: user.password,
      });
      localStorage.setItem("token", response.data.jwt);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state, action) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...state,
        token: localStorage.getItem("token"),
        email: "",
        username: "",
        id: "",
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
      };
    },
    clearState: (state, action) => {
      return {
        ...state,
        token: localStorage.getItem("token"),
        email: "",
        username: "",
        id: "",
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
      };
    },
    clearStatus: (state, action) => {
      return {
        ...state,
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
      };
    },
  },
  extraReducers: (builder) => {
    //registerUser
    builder.addCase(registerUser.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          registerStatus: "success",
        };
      } else return state;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload,
      };
    });

    //loginUser
    builder.addCase(loginUser.pending, (state, action) => {
      return { ...state, loginStatus: "pending" };
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        const { user } = action.payload;
        return {
          ...state,
          token: localStorage.getItem("token"),
          loginStatus: "success",
          id: user.id,
          username: user.username,
          email: user.email,
        };
      } else return state;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        loginError: action.payload,
      };
    });
  },
});

export const { logoutUser, clearState, clearStatus } = authSlice.actions;

export default authSlice.reducer;
