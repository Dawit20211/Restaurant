import { USER_URL } from "../mainUrls";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/register`, 
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
    deleteUsers: builder.mutation({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: USER_URL,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["User"], 
    }),
    adminUpdateUser: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/${data._id}`,
        method: "PUT",
        body: data,
        credentials: "include", 
      }),
      invalidatesTags: ["User"],
    }),
    getOneUser: builder.query({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
  useDeleteUsersMutation,
  useAdminUpdateUserMutation,
  useGetOneUserQuery,
  useRegisterUserMutation,
} = usersApiSlice;
