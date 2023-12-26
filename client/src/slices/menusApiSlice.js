import {MENU_URL} from "../mainUrls"; 
import { apiSlice } from "./apiSlice";

export const menusApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMneus: builder.query({
            query:  () => ({
                url: MENU_URL,
                method: "GET"
            }),
            keepUnusedDataFor: 5
        })
    })
})


export const { useGetMneusQuery } = menusApiSlice;
