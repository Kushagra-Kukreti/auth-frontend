import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthApi } from "../api/authApi";

const initialState = {
  signUp: {
    isLoading: false,
    isError: false,
    error: null,
    isSuccess: false,
    successMessage: "",
    data: {},
  },
  login: {
    isLoading: false,
    isError: false,
    error: null,
    isSuccess: false,
    successMessage: "",
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
 async function checkToken(){
   return new Promise((resolve,reject)=>{
    const token = localStorage.getItem('accessToken')
    if(token!== null)
    resolve("true")
    else
    setTimeout(checkToken,100)
   })
 }
export const signUpUser = createAsyncThunk("signUpUser", async (userInfo,{rejectWithValue}) => {
  try {
    const response = await AuthApi.signUpUser(userInfo);
    localStorage.setItem("accessToken", response.data.data.accessToken);
    await checkToken();
    console.log("token after setting ",localStorage.getItem('accessToken'));
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
});
export const loginUser = createAsyncThunk("loginUser", async (loginInfo,{rejectWithValue}) => {
  try {
    const response = await AuthApi.logInUser(loginInfo);
    localStorage.setItem("accessToken", response.data.data.accessToken);
    return response.data;
  } catch (error) {
     return rejectWithValue(error.response.data)
  }
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
        (state.signUp.error = action?.payload?.message)
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.login.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      (state.login.isLoading = false),
        (state.login.isSuccess = true),
        (state.login.successMessage = action.payload.message),
        (state.login.data = action.payload);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      console.log("login response",action.error);
      (state.login.isLoading = false),
        (state.login.isError = true),
        (state.login.error = action?.payload?.message)
    });
    builder.addCase(logoutUser.pending, (state, action) => {
      state.logOut.isLoading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      (state.logOut.isLoading = false),
        (state.logOut.isSuccess = true),
        (state.logOut.successMessage = action.payload.message),
        (state.logOut.data = action.payload);
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      (state.logOut.isLoading = false),
        (state.logOut.isError = true),
        (state.logOut.error = action?.payload?.message)
    });
  },
});
export default auth.reducer;
