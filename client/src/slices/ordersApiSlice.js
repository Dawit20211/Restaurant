import {ORDER_URL} from "../mainUrls"; 
import { apiSlice } from "./apiSlice";
export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createAnOrder: builder.mutation({
            query:  (body) => ({
                url: ORDER_URL,
                method: 'POST',
                body: {...body},
                credentials:"include",
            }),
            keepUnusedDataFor: 5
        }),    
    })
})

export const { useCreateAnOrderMutation } = ordersApiSlice;