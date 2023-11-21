import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartListProps } from "../types";

const initialCartState: CartListProps[] = [];

const cartSlice = createSlice({
    name: "cart",
    initialState: { 
        cartList: initialCartState,
        totalPrice: 0
    },
    reducers: {
       increment (state, action: PayloadAction<string>) {
            const item = state.cartList.find((item)=>item.id === action.payload);

            if (item) {
                item.innerArr[0].quantity += 1;
            }
       },
       decrement (state, action) {
            const item = state.cartList.find((item)=>item.id === action.payload);

            if (item && item.innerArr[0].quantity > 0) {
                item.innerArr[0].quantity -= 1;
            } 
            if (item && item.innerArr[0].quantity === 0) {
                state.cartList = state.cartList.filter((item)=>item.id !== action.payload)
            }
       },
       addToCart (state, action: PayloadAction<CartListProps>) {
            const item = action.payload;
            const existingItem = state.cartList.find((data)=> data.id === item.id);
            
            if (existingItem) {
                existingItem.innerArr[0].quantity += 1;
            } else {
                state.cartList.push(item);
            }
       }
    }
})

export const cartActions = cartSlice.actions;

export default cartSlice;