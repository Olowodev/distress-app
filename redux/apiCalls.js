import { signupStart, loginFailure, loginStart, loginSuccess, logoutStart, logoutSuccess, logoutFailure, signupSuccess, signupFailure, updateUserStart, updateUserSuccess, updateUserFailure} from "./userRedux"
import { publicRequest } from "../requestMethods";
import axios from 'axios';
import Storage from '@react-native-async-storage/async-storage'



export const login = async (dispatch,user) => {
    dispatch(loginStart());
    try{
        const res = await publicRequest.post('/auth/login', user)
        dispatch(loginSuccess(res.data))
    }catch(err){
        dispatch(loginFailure(err.response.data))
    }
}

export const signup = async (dispatch,user) => {
    dispatch(signupStart());
    try{
        const res = await publicRequest.post('/auth/register', user)
        dispatch(signupSuccess(res.data))
    }catch(err){
        dispatch(signupFailure(err.response.data))
    }
}

export const logout = async (dispatch) => {
    dispatch(logoutStart());
    try {
        dispatch(logoutSuccess())
        await Storage.removeItem('root')
    }catch(err){
        dispatch(logoutFailure(err))
    }
}


/*export const updateUser = async (id, dispatch,user) => {
    dispatch(updateUserStart());
    try{
        const res = await publicRequest.put(`/user/${id}`, user)
        dispatch(updateUserSuccess(res.data))
    }catch(err){
        dispatch(updateUserFailure(err.response.data))
        console.log(err.response.data)
    }
}*/