import { configureStore } from "@reduxjs/toolkit";
import auth from "../reducers/authSlice"
import user from "../reducers/userSlice"
export const store = configureStore({
    reducer:{auth,user}
})