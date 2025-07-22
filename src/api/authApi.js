import { axiosInstance } from "../utils/axiosInstance"

export class AuthApi {
    static signUpUser(userInfo){  
        return axiosInstance.post("/signup",userInfo)
    }
    static logInUser (loginInfo){
        return axiosInstance.post("/login",loginInfo)
    }
    static logoutUser (){
        return axiosInstance.post("/logout")
    }
    static getMe (){
        return axiosInstance.get("/me")
    }
   
}