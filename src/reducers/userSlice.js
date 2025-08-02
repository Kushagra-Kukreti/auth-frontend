import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthApi } from "../api/authApi";

const initialState = {
  fetchUser: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: {},
    error: null,
  },
  updateInfo: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: {},
    error: null,
  },
  changePassword: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: {},
    error: null,
  },
};

export const fetchUser = createAsyncThunk("fetchUser", async () => {
  const response = await AuthApi.getMe();
  return response.data;
});

export const updateInfo = createAsyncThunk("updateInfo", async (info) => {
  const response = await AuthApi.updateInfo(info);
  return response.data;
});

export const changePassword = createAsyncThunk("changePassword", async (info,{rejectWithValue}) => {
 try {
   const response = await AuthApi.changePassword(info);
   return response.data;
 } catch (error) {
   return rejectWithValue(error?.response?.data)
 }
});

const user = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.fetchUser.isLoading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.fetchUser.isLoading = false;
      state.fetchUser.data = action.payload;
      state.fetchUser.isSuccess = true;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.fetchUser.isLoading = false;
      state.fetchUser.isError = true;
      state.fetchUser.error = action.error.message;
    });
    builder.addCase(updateInfo.pending, (state, action) => {
      state.updateInfo.isLoading = true;
    });
    builder.addCase(updateInfo.fulfilled, (state, action) => {
      state.updateInfo.isLoading = false;
      state.updateInfo.data = action.payload;
      state.updateInfo.isSuccess = true;
    });
    builder.addCase(updateInfo.rejected, (state, action) => {
      state.updateInfo.isLoading = false;
      state.updateInfo.isError = true;
      state.updateInfo.error = action.error.message;
    });
    builder.addCase(changePassword.pending, (state, action) => {
      state.changePassword.isLoading = true;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.changePassword.isLoading = false;
      state.changePassword.data = action.payload;
      state.changePassword.isSuccess = true;
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.changePassword.isLoading = false;
      state.changePassword.isError = true;
      state.changePassword.error = action.error.message;
    });
  },
});

export const { changeUsername, resetPassword } = user.actions;
export default user.reducer;
