import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "@/redux/features/auth/authApi"; // Adjust path
import { toast } from "sonner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
interface ValidationError {
  message: string;
  errorSources?: { path: string; message: string }[];
}

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [register, { isLoading, error }] = useRegisterMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const userInfo = { name, email, password };
      const response = await register(userInfo).unwrap();

      if (response?.data?.success === true) {
        toast(`✅ Registered successfully: ${response.data.message}`);
        navigate("/login"); // Redirect to login on success
      } else {
        // Handle failure response from backend
        const errorMsg = response?.data?.message || "Registration failed";
        const errorDetails =
          response?.data?.errorSources
            ?.map((source: { path: string; message: string }) => `${source.path}: ${source.message}`)
            .join(", ") || "Unknown error";
        toast(`❌ ${errorMsg}${errorDetails ? " - " + errorDetails : ""}`);
      }
    } catch (err) {
      console.error("Registration failed:", err);
      if (error && "data" in error) {
        const fetchError = error as FetchBaseQueryError;
        const errorData = fetchError.data as ValidationError;
        const errorMsg = errorData?.message || "An error occurred during registration";
        const errorDetails =
          errorData?.errorSources
            ?.map((source: { path: string; message: string }) => `${source.path}: ${source.message}`)
            .join(", ") || "Unknown error";
        toast(`❌ ${errorMsg}${errorDetails ? " - " + errorDetails : ""}`);
      } else {
        toast("❌ An unexpected error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="John Doe"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        {/* Link to Login */}
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;