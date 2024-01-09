//helper function 
export const addDecimals = (num) =>{
    return (Math.round(num * 100) / 100).toFixed(2);
}

export const updateCart = (state) =>{
    state.itemsPrice =addDecimals(state.foodCartItems.reduce((acc, item) => acc + item.price * item.
    quantity, 0));

    //delivery price, order over £100 = free delivery else £8 delivery)
    state.deliveryPrice = addDecimals(state.itemsPrice > 15 ? 0 : 2);

    // tax
    state.taxPrice = addDecimals(Number((0.20 * state.itemsPrice).toFixed(2)))

    // total price 
    state.totalPrice = (
        Number(state.itemsPrice) + Number(state.deliveryPrice) + Number(state.taxPrice)
    ).toFixed(2);

    localStorage.setItem('foodCart', JSON.stringify(state));

    return state
}