import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FavouriteListProps } from "../types";


const initialFavouriteState: FavouriteListProps[] = [];

const favouriteSlice = createSlice({
    name: "favourite",
    initialState: { 
        itemsList: initialFavouriteState,
    },
    reducers: {
       addToFavourites (state, action: PayloadAction<FavouriteListProps>) {
            const item = action.payload;

            state.itemsList.push(item);
       },
       removeFromFavourites (state, action: PayloadAction<string>) {
            const data = action.payload;

            state.itemsList = state.itemsList.filter((item: FavouriteListProps)=>item.id !== data);
       }
    }
})

export const favouriteActions = favouriteSlice.actions;

export default favouriteSlice;