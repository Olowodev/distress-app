import { signupStart, loginFailure, loginStart, loginSuccess, logoutStart, logoutSuccess, logoutFailure, signupSuccess, signupFailure, updateUserStart, updateUserSuccess, updateUserFailure} from "./userRedux"
import { publicRequest } from "../requestMethods";
import axios from 'axios';
import Storage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'


const showToast = (type, text1, text2) => {
    Toast.show({
        type: type,
        text1: text1,
        text2: text2,
        visibilityTime: 6000
    })
}

export const login = async (dispatch,user) => {
    dispatch(loginStart());
    try{
        const res = await publicRequest.post('/auth/login', user)
        dispatch(loginSuccess(res.data))
        showToast('success', 'Login Successful')
    }catch(err){
        dispatch(loginFailure(err.toString()))
        console.log(err)
        showToast('error', 'Login not successful')
    }
}

export const signup = async (dispatch,user) => {
    dispatch(signupStart());
    try{
        const res = await publicRequest.post('/auth/register', user)
        dispatch(signupSuccess(res.data))
        showToast('success', 'SignUp Successful')
    }catch(err){
        dispatch(signupFailure(err))
        showToast('error', 'SignUp not successful')
    }
}

export const logout = async (dispatch) => {
    dispatch(logoutStart());
    try {
        dispatch(logoutSuccess())
        await Storage.removeItem('root')
        showToast('success', 'Successfully Logged out')
    }catch(err){
        dispatch(logoutFailure(err))
        showToast('error', 'Log Out Unsuccessful')
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