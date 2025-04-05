import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "http://localhost:5100/api",
    credentials:'include' //receives cookies and sets

}),
  endpoints: () => ({}),
});

