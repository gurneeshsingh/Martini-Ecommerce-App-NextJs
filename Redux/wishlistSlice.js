import { createSlice } from "@reduxjs/toolkit";


export const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        products: [],

    },
    reducers: {
        addToWishlist: (state, action) => {
            state.products.push(action.payload)

        },
        deleteFromWishlist: (state, action) => {
            const index = state.products.findIndex((item) => item._id === action.payload._id);
            if (index >= 0) {
                state.products.splice(index, 1)

            }
        },
        getWishlist: (state, action) => {
            if (action.payload.length === 0) {
                state.products = []
            } else if (action.payload.length >= 1) {
                state.products = action.payload[0]?.products
            }
            
        },
        resetWishlist: (state) => {
            state.products = []
        }
    }

});

export const { addToWishlist, deleteFromWishlist, getWishlist, resetWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;