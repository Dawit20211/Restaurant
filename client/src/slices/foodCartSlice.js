import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('foodCart') ? 
JSON.parse(localStorage.getItem('foodCart')) : {foodCartItems : []}

const addDecimals = (num) => {return (Math.round(num * 100) / 100).toFixed(2);}

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
   
        state.itemsPrice =addDecimals(state.foodCartItems.reduce((acc, item) => acc + item.price * item.
        quantity, 0));

        //shipping price, order over £100 = free sheipping else £8 sipping)
        state.shippingPrice = addDecimals(state.itemsPrice > 15 ? 0 : 2);

        // tax price
        state.taxPrice = addDecimals(Number((0.20 * state.itemsPrice).toFixed(2)))

        // total price 
        state.totalPrice = (
            Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)
        ).toFixed(2);

        localStorage.setItem('foodCart', JSON.stringify(state));

        },
        
    }
})
export default foodCartSlice.reducer;

export const { addToFoodCart } = foodCartSlice.actions;