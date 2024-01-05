import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    userDetails : localStorage.getItem('userDetails') ?
    JSON.parse(localStorage).getItem('userDetails') : null,
}

const userSlice = createSlice ({
    name: 'user',
    initialState,
    reducers:{
        login: (state, action) =>{
            state.userDetails = action.payload;

            localStorage.setItem('userDetails', JSON.stringify(action.payload));

        },

        logout: (state) =>{
            state.userDetails = null;
            localStorage.removeItem('userDetails');
        }
    }
})

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;