import {USER_URL} from "../mainUrls"; 
import { apiSlice } from "./apiSlice";


export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        login: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/login`,
                method:'POST',
                body: data,
            }),
            keepUsingDataFor: 5,
        }),

    })
})

export const  { 
    useLoginMutaion,

} = userApiSlice;