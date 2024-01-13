import { MENU_URL } from "../mainUrls";
import { apiSlice } from "./apiSlice";

export const menusApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMenus: builder.query({
      query: () => ({
        url: MENU_URL,
        method: "GET",
      }),
      providesTags: ["Menu"],
      keepUnusedDataFor: 5,
    }),

    getMenu: builder.query({
      query: (menuId) => ({
        url: `${MENU_URL}/${menuId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    addNewIemToMenu: builder.mutation({
      query: () => ({
        url: MENU_URL,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Menu"],
    }),
    updateMenu: builder.mutation({
      query: (data) => ({
        url: `${MENU_URL}/${data._id}`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Menu"],
    }),
  }),
});

export const {
  useGetMenusQuery,
  useAddNewIemToMenuMutation,
  useUpdateMenuMutation,
  useGetMenuQuery,
} = menusApiSlice;
