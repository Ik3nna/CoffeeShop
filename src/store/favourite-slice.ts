import { createSlice } from "@reduxjs/toolkit";
import { FavouriteListProps } from "../types";


const initialFavouriteState: FavouriteListProps[] = [];

const favouriteSlice = createSlice({
    name: "favourite",
    initialState: { 
        itemsList: initialFavouriteState,
    },
    reducers: {
       addToFavourites (state, action) {
            const item: FavouriteListProps = action.payload;

            state.itemsList.push(item);
       },
       removeFromFavourites (state, action) {
            const data = action.payload.id;

            state.itemsList = state.itemsList.filter((item: FavouriteListProps)=>item.id !== data);
       }
    }
})

export const favouriteActions = favouriteSlice.actions;

export default favouriteSlice;