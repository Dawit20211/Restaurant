import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import foodCartSliceReducer from './slices/foodCartSlice';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        foodCart: foodCartSliceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store;