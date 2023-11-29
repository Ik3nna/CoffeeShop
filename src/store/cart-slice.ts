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
       increment (state, action) {
            const data = action.payload
            const item = state.cartList.find((item)=>item.id === data.id);
            const existingItem = item?.innerArr.find((item: any)=>item.size === data.size);
        
            if (existingItem) {
                existingItem.quantity += 1;
            }
       },
       decrement (state, action) {
            const data = action.payload
            const item = state.cartList.find((item)=>item.id === data.id);
            const existingItem = item?.innerArr.find((item: any)=>item.size === data.size);

            if (existingItem) {
                if (existingItem.quantity > 0) {
                  existingItem.quantity -= 1;
                } 
                if (existingItem.quantity === 0) {
                  const newArr = item?.innerArr.filter((item: any) => item.size !== existingItem.size);
            
                  if (!newArr.length) {
                    state.cartList = state.cartList.filter((data) => data.id !== item?.id);
                  } else {
                    state.cartList = state.cartList.map((data) => {
                      if (data.id === item?.id) {
                        data.innerArr = newArr;
                      }
                      return data;
                    });
                  }
                }
            }
       },
       addToCart (state, action: PayloadAction<CartListProps>) {
            const item = action.payload;
            const existingItem = state.cartList.find((data)=> data.id === item.id);
            
            if (existingItem) {
                const existingSize = existingItem.innerArr.find((data: any)=>data.size === item.innerArr[0].size);

                if (existingSize) {
                    existingItem.innerArr[0].quantity += 1;
                } else {
                    existingItem.innerArr.push(item.innerArr[0]);
                }
            } else {
                state.cartList.push(item);
            }
       }
    }
})

export const cartActions = cartSlice.actions;

export default cartSlice;