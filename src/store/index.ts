import { configureStore } from "@reduxjs/toolkit";
import favouriteSlice from "./favourite-slice";

import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/lib/persistStore";
import persistReducer from "redux-persist/es/persistReducer";

const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const persistedFavouriteReducer = persistReducer(persistConfig, favouriteSlice.reducer);
// const persistedCartReducer = persistReducer(persistConfig, cartSlice.reducer);

const store = configureStore({
    reducer: {
        favourite: persistedFavouriteReducer,
        
    }
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export default store;