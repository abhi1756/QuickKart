import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import userReducer from "./ReduxSlice"
import persistStore from "redux-persist/es/persistStore";
import storage from 'redux-persist/lib/storage';
import cartReducer from "./ReduxSlice"

const persistConfig = {
    key : 'root',
    storage,
    whiteList: ['cart']
};

const rootReducer = combineReducers({
    cart: cartReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);



export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);