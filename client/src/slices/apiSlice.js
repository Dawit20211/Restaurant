import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../mainUrls";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });
export const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: ["User", "Order", "Menu"],
  endpoints: (builder) => ({}),
});
