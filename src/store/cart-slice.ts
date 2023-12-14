import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartListProps, OrderHistoryListProps } from "../types";

const initialCartState: CartListProps[] = [];
const initialOrderHistoryList: OrderHistoryListProps[] = []

const cartSlice = createSlice({
  name: "cart",
  initialState: { 
    cartList: initialCartState,
    orderHistoryList: initialOrderHistoryList,
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

      state.totalPrice = parseFloat(
        state.cartList.reduce((total, cartItem) => {
          return (
            total +
            cartItem.innerArr.reduce((itemTotal: number, innerItem: any) => {
              const itemPrice = parseFloat(innerItem.price);
              return itemTotal + innerItem.quantity * itemPrice;
            }, 0)
          );
        }, 0).toFixed(2)
      );
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

      state.totalPrice = parseFloat(
        state.cartList.reduce((total, cartItem) => {
          return (
            total +
            cartItem.innerArr.reduce((itemTotal: number, innerItem: any) => {
              const itemPrice = parseFloat(innerItem.price);
              return itemTotal + innerItem.quantity * itemPrice;
            }, 0)
          );
        }, 0).toFixed(2)
      );
    },
    addToCart (state, action: PayloadAction<CartListProps>) {
      const item = action.payload;
      const existingItem = state.cartList.find((data)=> data.id === item.id);
            
      if (existingItem) {
        const existingSizeIndex = existingItem.innerArr.findIndex(
          (data: any) => data.size === item.innerArr[0].size
        );

        if (existingSizeIndex !== -1) {
          existingItem.innerArr[existingSizeIndex].quantity += 1;
        } else {
          existingItem.innerArr.push(item.innerArr[0]);
        }
      } else {
        state.cartList.push(item);
      }

      state.totalPrice = parseFloat(
        state.cartList.reduce((total, cartItem) => {
          return (
            total +
            cartItem.innerArr.reduce((itemTotal: number, innerItem: any) => {
              const itemPrice = parseFloat(innerItem.price);
              return itemTotal + innerItem.quantity * itemPrice;
            }, 0)
          );
        }, 0).toFixed(2)
      );
    },
    checkoutFromCart (state, action: PayloadAction<OrderHistoryListProps>) {
      const item = action.payload;

      state.orderHistoryList.push(item);

      state.cartList = [];
    }
  }
})

export const cartActions = cartSlice.actions;

export default cartSlice;