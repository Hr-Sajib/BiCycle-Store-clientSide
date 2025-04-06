import { baseApi } from "@/redux/api/baseApi";

// Define the TUser type (same as allUserSlice)
type TUser = {
  _id: string;
  email: string;
  name: string;
  password: string; // Remove if not returned by backend
  passwordChangedAt?: string | Date;
  role: "admin" | "customer";
  status: "deactivated" | "active";
  isDeleted: boolean;
  createdAt: string;
};

// Define the response type
interface UsersResponse {
  success: boolean;
  data: TUser[];
}

export const allUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all users
    getAllUsers: builder.query<UsersResponse, void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
    // Toggle user status
    toggleUserStatus: builder.mutation<TUser, string>({
      query: (userId) => ({
        url: `/users/${userId}/toggle-status`, // Adjust endpoint as per your backend
        method: "PATCH",
      }),
    }),
  }),
});

// Export hooks for usage in components
export const { useGetAllUsersQuery, useToggleUserStatusMutation } = allUserApi;