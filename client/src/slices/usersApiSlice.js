import {USER_URL} from "../mainUrls"; 
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        login: builder.mutation({
            query: (data) => ({
              url: `${USER_URL}/login`,
              method: 'POST',
              body: data,
              credentials: "include",
            }),
          }),
          registerUser: builder.mutation({
            query: (data) => ({
              url: `${USER_URL}`,
              method: 'POST',
              body: data,
            }),
          }),
          logout: builder.mutation({
            query: () => ({
              url: `${USER_URL}/logout`,
              method: 'POST',
            }),
          }),
    })
})

export const  { 
    useLoginMutation,
    useLogoutMutation,
    useRegisterUserMutation,

} = usersApiSlice;