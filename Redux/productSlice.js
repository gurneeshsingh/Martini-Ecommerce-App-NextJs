import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



export const addProduct = createAsyncThunk('addproduct', async (product) => {
    const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.authToken;
    const response = await axios.post(`https://martiniapi.cyclic.app/api/product/addproduct`, product, {
        headers: {
            'auth-token': TOKEN
        }
    })
    return response.data
});

export const getProducts = createAsyncThunk('product', async () => {

    const response = await axios.get('https://martiniapi.cyclic.app/api/product');

    return response.data
});

export const deleteProduct = createAsyncThunk('deleteProduct', async (id) => {

    const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.authToken;
    const response = await axios.delete(`https://martiniapi.cyclic.app/api/product/${id}`, {
        headers: {
            'auth-token': TOKEN
        }
    })
    return id
});

export const editProduct = createAsyncThunk('editProduct', async (product) => {
    const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.authToken;
    const response = await axios.put(`https://martiniapi.cyclic.app/api/product/${product?._id}`, product, {
        headers: {
            'auth-token': TOKEN
        }
    })
    return response.data
});

export const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        isFetching: false,
        error: false
    },
    extraReducers: {
        [getProducts.pending]: (state) => {
            state.isFetching = true,
                state.error = false
        },
        [getProducts.fulfilled]: (state, action) => {
            state.isFetching = false,
                state.products = action.payload
        },
        [getProducts.rejected]: (state) => {
            state.isFetching = false
            state.error = true
        },
        [deleteProduct.pending]: (state) => {
            state.isFetching = true,
                state.error = false
            toast.warning('Some error occured', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            })
        },
        [deleteProduct.fulfilled]: (state, action) => {
            state.isFetching = false;
            const index = state.products.findIndex((item) => item._id === action.payload);
            index && state.products.splice(index, 1)
            toast.info('Item Removed', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            })
        },
        [deleteProduct.rejected]: (state) => {
            state.isFetching = false
            state.error = true
        },
        [addProduct.pending]: (state) => {
            state.isFetching = true,
                state.error = false
        },
        [addProduct.fulfilled]: (state, action) => {
            state.isFetching = false,
                state.products.splice(0, 0, action.payload)
            toast.success('Product Added', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            })
        },
        [addProduct.rejected]: (state) => {
            state.isFetching = false,
                state.error = true
            toast.warning('Some error occured', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            })
        },
        [editProduct.pending]: (state) => {
            state.isFetching = true,
                state.error = false
        },
        [editProduct.fulfilled]: (state, action) => {
            state.isFetching = false;
            toast.success('Product Details Updated', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            })


        },
        [editProduct.rejected]: (state) => {
            state.isFetching = false,
                state.error = true
            toast.warning('Some error occured', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            })
        }
    }
});

export default productSlice.reducer;