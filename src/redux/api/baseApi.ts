import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store"; // Adjust path to your store

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "bi-cycle-store-server-nu.vercel.app/api",
    credentials: "include", // for uses of cookies
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token; // Get token from auth slice
      if (token) {
        headers.set("Authorization", `${token}`); 
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});