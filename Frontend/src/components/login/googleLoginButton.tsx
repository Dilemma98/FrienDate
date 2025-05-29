import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import { loginWithGoogleApi } from "./googleAuthService";

const GoogleLoginButton: React.FC = () => {

  const navigate = useNavigate();
  const {setUserData, setIsLoggedIn } = useUser();
  // Initialize Google login with success and error handlers
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        // Awaits loginAuthService 
        const { backendUser, accessToken } = await loginWithGoogleApi(response.access_token);

        localStorage.setItem("frienDateUser", JSON.stringify(backendUser.user));
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("isLoggedIn", "true");

        setUserData(backendUser.user);
        setIsLoggedIn(true);
        window.dispatchEvent(new Event("userLogin"));
        navigate("/userDashboard");
      } catch (err) {
        console.error("❌ Login error:", err);
      }
    },
    onError: (error) => console.error("Login failed:", error),
    scope: [
      "https://www.googleapis.com/auth/calendar.events",
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  });

  // Render the Google login button
  return (
    <div className="p-6">
      <button
        onClick={() => login()}
        className="w-full max-w-sm px-6 py-3 text-base font-medium text-white bg-gradient-to-b from-[#7a4c5a] to-[#89656f] border border-gray-300 rounded-lg shadow-sm hover:bg-[#bd7d8d] hover:cursor-pointer hover:shadow-lg hover:border-gray-400 transition flex items-center justify-center gap-3"
      >
        {/* Using FcGoogle to access logo */}
        <FcGoogle className="text-2xl" />
        Logga in med Google
      </button>
    </div>
  );
};

export default GoogleLoginButton;
