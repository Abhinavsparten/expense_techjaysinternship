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
//Update password
export const UpdatePass=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/users/updatepass`,body)
}
//addexpense
export const Addexpense=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/users/addexp`,body)
}
//edit expense
export const Editexpense=async(id,body)=>{
    return await commonRequest("POST",`${BASE_URL}/users/editexp/${id}`,body)
}
//get single expense 
export const getsingleExp=async(id)=>{
    return await commonRequest("GET",`${BASE_URL}/users/singleexp/${id}`,"")
}

//delete expense
export const deleteExp=async(id)=>{
    return await commonRequest("DELETE",`${BASE_URL}/users/deleteexp/${id}`,"")
}

//get user
export const getUsers=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/users/getuser`,body)
}
//get all transactions
export const getTransactions=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/users/gettransactions`,body)
}

//get History
export const getHIstory=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/users/gethistory`,body)
}
//acc delete
export const deleteAcc=async(id)=>{
    return await commonRequest("DELETE",`${BASE_URL}/users/deleteacc/${id}`,"")
}


