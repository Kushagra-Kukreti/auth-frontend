import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthApi } from "../api/authApi";

const initialState = {
  signUp: {
    isLoading: false,
    isError: false,
    error: null,
    isSuccess: false,
    successMessage: "",
    errorMessage: "",
    data: {},
  },
  login: {
    isLoading: false,
    isError: false,
    error: null,
    isSuccess: false,
    successMessage: "",
    errorMessage: "",
    data: {},
  },
  logOut: {
    isLoading: false,
    isError: false,
    error: null,
    isSuccess: false,
    successMessage: "",
    errorMessage: "",
    data: {},
  },
};

export const signUpUser = createAsyncThunk("signUpUser", async (userInfo) => {
  try {
    const response = await AuthApi.signUpUser(userInfo);
    localStorage.setItem("accessToken", response.data.data.accessToken);
    return response.data;
  } catch (error) {
    throw new Error("Cant sign in user");
  }
});
export const loginUser = createAsyncThunk("loginUser", async (loginInfo) => {
  const response = await AuthApi.logInUser(loginInfo);
  localStorage.setItem("accessToken", response.data.data.accessToken);
  return response.data;
});

export const logoutUser = createAsyncThunk("logoutUser", async () => {
  const response = await AuthApi.logoutUser();
  localStorage.removeItem("accessToken");
  return response.data;
});

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUpUser.pending, (state, action) => {
      state.signUp.isLoading = true;
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      (state.signUp.isLoading = false),
        (state.signUp.isSuccess = true),
        (state.signUp.successMessage = action.payload.message),
        (state.signUp.data = action.payload);
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      (state.signUp.isLoading = false),
        (state.signUp.isError = true),
        (state.signUp.error = action?.payload?.data),
        (state.signUp.errorMessage = action?.payload?.message);
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.login.isLoading = false;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      (state.login.isLoading = false),
        (state.login.isSuccess = true),
        (state.login.successMessage = action.payload.message),
        (state.login.data = action.payload);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      (state.login.isLoading = false),
        (state.login.isError = true),
        (state.login.error = action?.payload?.data),
        (state.login.errorMessage = action?.payload?.message);
    });
  },
});
export default auth.reducer;
