import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// Define the User interface (aligned with backend)
export interface User {
  name: string;
  email: string;
  // Remove password since backend excludes it
  // Add other fields if returned by backend (e.g., role)
}

// Define the state type for user
type TUserState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

// Initial state
const initialState: TUserState = {
  user: null,
  loading: false,
  error: null,
};

// Create the user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
});

// Export actions and reducer
export const { setUser, setLoading, setError, clearUser } = userSlice.actions;
export default userSlice.reducer;

// Selectors
export const selectUser = (state: RootState) => state.user.user;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;