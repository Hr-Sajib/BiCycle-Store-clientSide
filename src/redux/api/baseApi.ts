import {
  createApi,
  fetchBaseQuery,
  FetchArgs,
  BaseQueryFn,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { setUser, logout } from "../features/auth/authSlice"; 

const baseQuery = fetchBaseQuery({
  baseUrl: "https://bi-cycle-store-server-nu.vercel.app/api",
  credentials: "include", // For sending cookies (e.g., refresh token)
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token; // Get token from auth slice
    // console.log("Preparing headers with token:", token);
    if (token) {
      headers.set("Authorization", `${token}`);
    }
    return headers;
  },
});


interface ErrorData {
  message?: string;
}

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // console.log("Making request with args:", args);
  let result = await baseQuery(args, api, extraOptions);
  // console.log("Initial request result:", result);

  // Handle 401 or 500 with "jwt expired" message
  if (
    (result.error && result.error.status === 401) || 
    (result.error && 
     result.error.status === 500 && 
     (result.error.data as ErrorData)?.message === "jwt expired")
  ) {
    console.log("Token expired detected (401 or 500), attempting to refresh token");
    // Attempt to refresh the token
    const refreshResult = await fetch(
      "https://bi-cycle-store-server-nu.vercel.app/api/auth/refresh-token",
      {
        method: "POST",
        credentials: "include", // Include cookies (e.g., refresh token)
      }
    );

    const refreshData = await refreshResult.json();
    console.log("Refresh token response:", refreshData);

    if (refreshData?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;
      console.log("Current user from state:", user);
      api.dispatch(
        setUser({
          user,
          token: refreshData.data.accessToken,
        })
      );
      console.log("Dispatched setUser with new token:", refreshData.data.accessToken);

      // Retry the original request with the new token
      result = await baseQuery(args, api, extraOptions);
      console.log("Retry request result:", result);
    } else {
      console.log("Refresh token failed, logging out");
      api.dispatch(logout());
    }
  }

  // console.log("Final result returned:", result);
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});




// http://localhost:5100/
// https://bi-cycle-store-server-nu.vercel.app
// Define an interface for the expected error data structure