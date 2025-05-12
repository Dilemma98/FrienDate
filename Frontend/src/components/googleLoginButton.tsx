import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { UserData } from "./userDashboard";

interface GoogleLoginButtonProps {
  setUserData: (data: UserData) => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ setUserData }) => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
        });

        const userInfo = await res.json();

        const backendRes = await fetch("http://localhost:5231/api/google/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Email: userInfo.email,
            Name: userInfo.name,
            Picture: userInfo.picture,
            GivenName: userInfo.given_name,
            FamilyName: userInfo.family_name,
            Token: response.access_token,
          }),
        });

        if (!backendRes.ok) {
          const errorText = await backendRes.text();
          try {
            const parsedError = JSON.parse(errorText);
            console.error("Backend error:", parsedError);
          } catch {
            console.error("Server error:", errorText);
          }
          throw new Error("Backend validation failed");
        }

        const backendUser = await backendRes.json();
        localStorage.setItem("frienDateUser", JSON.stringify(backendUser.user));
        setUserData(backendUser.user);
        localStorage.setItem("accessToken", response.access_token);
        localStorage.setItem("isLoggedIn", "true");

        navigate("/userDashboard");
      } catch (err) {
        console.error("❌ Login error:", err);
      }
    },
    onError: (error) => console.error("Login failed:", error),
    scope:
      "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
  });

  return (
    <div className="p-6">
      <button
        onClick={() => login()}
        className="px-6 py-3 text-lg bg-gradient-to-b from-[#bd7d8d] to-[#a05e6e] text-white font-bold rounded-full shadow-md transition-transform transform hover:scale-110 hover:bg-[#8f5060] flex items-center justify-center gap-3"
      >
        Logga in med Google
        <FcGoogle className="text-2xl bg-white rounded-full" />
      </button>
    </div>
  );
};

export default GoogleLoginButton;
