import BASE_URL from "./baseurl";
import { commonRequest } from "./commonReq";

//register
export const registerUser=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/users/register`,body)
}

//login
export const loginUser=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/users/login`,body)
}

//Reset password
export const ResetPass=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/users/resetpass`,body)
}
//addexpense
export const Addexpense=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/users/addexp`,body)
}

//addexpense
export const getExpenses=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/users/getexps`,body)
}

//addexpense
export const getHIstory=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/users/gethistory`,body)
}
//acc delete
export const deleteAcc=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/users/deleteacc`,body)
}


