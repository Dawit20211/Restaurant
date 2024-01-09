import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../Utils/FoodCartUtil';

const initialState = localStorage.getItem('foodCart') ? 
JSON.parse(localStorage.getItem('foodCart')) : {foodCartItems : [], deliveryAddress: {}, paymentMethod: 'Strip'}

const foodCartSlice = createSlice({
    name: 'foodCart',
    initialState,
    reducers: {
        addToFoodCart: (state, action) => {
            const item = action.payload;
            const itemExists = state.foodCartItems.find((x) => x._id === item._id);

            if (itemExists) {
                state.foodCartItems = state.foodCartItems.map((x) =>
                    x._id === itemExists._id ? item : x
                );
            } else {
                state.foodCartItems = [...state.foodCartItems, item];
            }

            //console.log('foodCartItems after addToFoodCart:', state.foodCartItems);

            return updateCart(state, item);
        },
        removeFoodFromCart: (state, action) => {
            state.foodCartItems = state.foodCartItems.filter((x) => x._id !== action.payload);
            return updateCart(state);
        },
        saveDeliveryAddress: (state, action) =>{
            state.deliveryAddress = action.payload;
            return updateCart(state)
        },
        savePaymentMethod: (state, action) =>{
            state.paymentMethod = action.payload;
            localStorage.setItem('foodCart', JSON.stringify(state))
        }
    }
})
export default foodCartSlice.reducer;

export const { addToFoodCart, removeFoodFromCart, saveDeliveryAddress, savePaymentMethod } = foodCartSlice.actions;