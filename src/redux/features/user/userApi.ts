import { baseApi } from "../../api/baseApi";
import { User } from "./userSlice";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.mutation<{ data: User }, { email: string }>({
      query: (body) => ({
        url: "/users/me", // Adjust URL based on your backend
        method: "POST", // Changed to POST to send data in body
        body, // Send email in request body
      }),
    //   invalidatesTags: ["User"], // Using invalidatesTags since it's a mutation
    }),
    updateUser: builder.mutation<{ data: User }, Partial<User>>({
      query: (userData) => ({
        url: "/users",
        method: "PATCH",
        body: userData,
      }),
    //   invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUserMutation, useUpdateUserMutation } = userApi;