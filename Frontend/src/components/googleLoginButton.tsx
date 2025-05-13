import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { UserData } from "../declarations/declarations.d";

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
        //For development purposes
        // const backendRes = await fetch("http://localhost:5231/api/google/login", {

        //When deployed
        const backendRes = await fetch("http://152.42.135.43:5231/api/google/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
           credentials: 'include',
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
        localStorage.setItem("accessToken", response.access_token);
        localStorage.setItem("isLoggedIn", "true");

        setUserData(backendUser.user);

        window.dispatchEvent(new Event("userLogin"));

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
    className="w-full max-w-sm px-6 py-3 text-base font-medium text-white bg-[#562f39] border border-gray-300 rounded-lg shadow-sm hover:bg-[#bd7d8d] hover:cursor-pointer hover:shadow-lg hover:border-gray-400 transition flex items-center justify-center gap-3"
  >
    <FcGoogle className="text-2xl" />
    Logga in med Google
  </button>
</div>
  );
};

export default GoogleLoginButton;
