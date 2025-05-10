import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { verifyToken } from "@/utils/verifyToken";
import Aos from "aos";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Define a custom error type to handle RTK Query error shapes
interface LoginError {
  data?: {
    message?: string;
  };
  message?: string; // Fallback for SerializedError
}

function Login() {
  useEffect(() => {
    window.scrollTo({ top: 0 });
    Aos.init({
      duration: 600,
      once: true,
      offset: 20,
    });
  }, []);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  // State to manage form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await login({ email, password });

      console.log("response: ", response);

      if (response?.data?.data?.accessToken) {
        const user = verifyToken(response?.data?.data?.accessToken);
        if (user) {
          console.log("Login successful:", user);
          toast("✅ Logged in successfully");
          dispatch(
            setUser({
              user: user,
              token: response?.data?.data?.accessToken,
            })
          );
          navigate("/");
        } else {
          toast("Gained Token not valid");
        }
      } else if (response?.error) {
        const error = response.error as LoginError;
        console.log("Login Error:", response?.error);
        toast(`Login Error: ${error.data?.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Unexpected Login Error:", err);
      toast(`❌ Unexpected Login Error. See console`);
    }
  };

  // Handlers to fill demo credentials
  const handleDemoUser = () => {
    setEmail("sajib@bicycle.com");
    setPassword("sajib@bicycle");
  };

  const handleDemoAdmin = () => {
    setEmail("admin@bicycle.com");
    setPassword("admin@bicycle");
  };

  return (
    <div className="min-h-screen border bg-gray-100">
      <div data-aos="zoom-in" className="bg-white mx-auto mt-[20vh] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

       

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email} // Controlled input
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password} // Controlled input
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
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </div>
        </form>
        {/* Link to Register */}
        <p className="mt-2 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
         {/* Demo Buttons */}
         <div className="flex gap-1 mt-6">
          <button
            onClick={handleDemoUser}
            className="py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Demo User
          </button>
          <button
            onClick={handleDemoAdmin}
            className="py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Demo Admin
          </button>
        </div>
      </div>
      
    </div>
  );
}

export default Login;