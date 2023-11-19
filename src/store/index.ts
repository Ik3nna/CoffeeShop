import { configureStore } from "@reduxjs/toolkit";
import favouriteSlice from "./favourite-slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import persistStore from "redux-persist/lib/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
}

const persistedFavouriteReducer = persistReducer(persistConfig, favouriteSlice.reducer);
// const persistedCartReducer = apersistReducer(persistConfig, cartSlice.reducer);

const store = configureStore({
    reducer: {
        favourite: persistedFavouriteReducer,
        
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistedStore = persistStore(store);

export type RootState = { [any: string]: any }

export default store;