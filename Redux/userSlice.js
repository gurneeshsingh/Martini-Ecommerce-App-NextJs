import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const loginUser = createAsyncThunk('login', async (user) => {

    const response = await axios.post('https://martiniapi.herokuapp.com/api/auth/login', user);
    
    return response.data
});

export const registerUser = createAsyncThunk('register', async (user) => {

    const response = await axios.post('https://martiniapi.herokuapp.com/api/auth/register', user);
    return response.data
});


export const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
        isRegistered: null
    },
    reducers: {
        logout: (state) => {
            state.currentUser = null
        }
    },
    extraReducers: {
        [loginUser.pending]: (state) => {
            state.isFetching = true,
                state.error = false
        },
        [loginUser.fulfilled]: (state, action) => {
            state.isFetching = false,
                state.currentUser = action.payload
            toast.success('Sign In Successfull', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            })

        },
        [loginUser.rejected]: (state) => {
            state.isFetching = false,
                state.error = true,
                toast.error("Sign In using proper credentials", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme:"colored"
        
                })
        },
        [registerUser.pending]: (state) => {
            state.isFetching = true,
                state.error = false,
                state.isRegistered = false
        },
        [registerUser.fulfilled]: (state, action) => {
            state.isFetching = false,
                state.isRegistered = action.payload,
                toast.success('Registered Successfully', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                })
        },
        [registerUser.rejected]: (state) => {
            state.isFetching = false,
                state.error = true,
                toast.error("Register using proper ", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme:"colored"
        
                })
        }
    },


});
export const { logout } = userSlice.actions;
export default userSlice.reducer;