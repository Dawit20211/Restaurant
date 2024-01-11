import {ORDER_URL} from "../mainUrls"; 
import { STRIPE_URL } from "../mainUrls";

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
        getOrderById: builder.query({
            query: (id) => ({
              url: `${ORDER_URL}/${id}`,
              credentials: 'include',
            }),
            keepUnusedDataFor: 5,
        }),
        getAllMyOrders: builder.query({
            query: () => ({
                url: `${ORDER_URL}/myorders`,
                credentials:"include",
            }),
            keepUnusedDataFor: 5
        }),
        getAllOrders: builder.query({
            query: () => ({
                url: `${ORDER_URL}`,
                credentials: "include",
            }),
            keepUnusedDataFor:5
        }),
        updateDelivery: builder.mutation({
            query: (id) => ({
                url: `${ORDER_URL}/${id}/delivered`,
                method: 'PUT',
                credentials: "include",
            })
        })
        // payForOrder: builder.mutation({
        //     query: ( {orderId, details} ) => ({
        //         url: `${ORDER_URL}/${orderId}/paid`,
        //         method: 'PUT',
        //         body: {...details},
        //         credentials:"include",
        //     }),
        // }),
        // getSecretId: builder.query({
        //     query: () => ({
        //         url: STRIPE_URL,
        //     }),
        //     keepUnusedDataFor: 5,
        // }),

        
    })
})

export const { 
    useCreateAnOrderMutation,
     useGetOrderByIdQuery, 
     useGetAllMyOrdersQuery,
     useUpdateDeliveryMutation,
     useGetAllOrdersQuery,
    

    } = ordersApiSlice;