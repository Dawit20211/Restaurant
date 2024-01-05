import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import foodCartSliceReducer from './slices/foodCartSlice';
import userSliceReducer from './slices/userSlice';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        foodCart: foodCartSliceReducer,
        user: userSliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store;