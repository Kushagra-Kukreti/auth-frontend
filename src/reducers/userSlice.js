import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AuthApi } from "../api/authApi"

const initialState = {
     data:{},
     authStatus:false,
     isLoading:false,
     isError:false,
     error:null,
     isSuccess:false
}

export const fetchUser = createAsyncThunk("fetchUser",async()=>{
    const response = await AuthApi.getMe()
    return response.data
})

const user = createSlice({
    name:"user",
    initialState,
    reducers:{
        changeUsername:(state,action)=>{

        },
        resetPassword:(state,action)=>{

        }
        
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUser.pending,(state,action)=>{
           state.isLoading = true
        })
        builder.addCase(fetchUser.fulfilled,(state,action)=>{
            state.isLoading = false
            state.data = action.payload
            state.isSuccess = true
        })
        builder.addCase(fetchUser.rejected,(state,action)=>{
           state.isLoading = false
           state.isError = true
           state.error = action.payload
        })
    }
})

export const {changeUsername,resetPassword} = user.actions
export default user.reducer