import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../../utils/axios';

const initialState = {
    user: null,
    token: null,
    isloading: false,
    status: null,
}

export const registerUser = createAsyncThunk( 'auth/registerUser',
    async (args, options) => {
    try {
        const data = await axios.post('/Authtoris/register', {
            username: args.username,
            password: args.password,
        })
        if (data.token){
            window.localStorage.setItem('token', data.token)
        }
        return data
    } catch (error) {
        return options.rejectWithValue(error)
    }
}   
)

export const loginUser = createAsyncThunk( 'auth/loginUser',
    async (args, options) => {
    try {
        const data = await axios.post('/Authtoris/login', {
            username: args.username,
            password: args.password,
        })
        if (data.token){
            window.localStorage.setItem('token', data.token)
        }
        return data
    } catch (error) {
        return options.rejectWithValue(error)
    }
}   
)
export const authSlice = createSlice ( {
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        //Register
        [registerUser.pending]: (state) => {
            state.isloading = true
            state.status = null
        }, //Запрос отправляется
        [registerUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = console.log(action.payload.message); 
            state.user = action.payload.user
            state.token = action.payload.token
           
        },  // выполнен до конца
        [registerUser.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isloading = false
        },  // отклонён

        //Login
        [loginUser.pending]: (state) => {
            state.isloading = true
            state.status = null
        }, //Запрос отправляется
        [loginUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = console.log(action.payload.message); 
            state.user = action.payload.user
            state.token = action.payload.token
           
        },  // выполнен до конца
        [loginUser.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isloading = false
        },  // отклонён
    }
})

export default authSlice.reducer
export const checkIsAuth = (state) => Boolean(state.auth.token)
