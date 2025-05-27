import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useUser } from "./context/userContext";

const GoogleLoginButton: React.FC = () => {

  const navigate = useNavigate();
  const {setUserData, setIsLoggedIn } = useUser();
  // Initialize Google login with success and error handlers
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        // Fetch the user's profile data using the received access token
        const res = await fetch(
          "https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos,addresses",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );

        const profile = await res.json();
        const userInfo = {
          email: profile.emailAddresses?.[0]?.value || "",
          name: profile.names?.[0]?.displayName || "",
          picture: profile.photos?.[0]?.url || "",
          given_name: profile.names?.[0]?.givenName || "",
          family_name: profile.names?.[0]?.familyName || "",
        };
        
        // Send the user data to the backend for validation
        const backendRes = await fetch(
          "http://localhost:5231/api/google/login",
          {
            // For deployment, change to the actual backend URL
            // const backendRes = await fetch("http://152.42.135.43:5231/api/google/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Include credentials for session management
            body: JSON.stringify({
              Email: userInfo.email,
              Name: userInfo.name,
              Picture: userInfo.picture,
              GivenName: userInfo.given_name,
              FamilyName: userInfo.family_name,
              Token: response.access_token,
            }),
          }
        );

        // Check if the backend response is OK
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

        // If successful, parse the backend user data and store it in localStorage
        const backendUser = await backendRes.json();
        localStorage.setItem("frienDateUser", JSON.stringify(backendUser.user));
        localStorage.setItem("accessToken", response.access_token);
        localStorage.setItem("isLoggedIn", "true");

        // Set the user data in the parent component
        setUserData(backendUser.user);
        setIsLoggedIn(true);

        // Trigger a custom event indicating the user is logged in
        window.dispatchEvent(new Event("userLogin"));

        // Navigate to the user dashboard
        navigate("/userDashboard");
      } catch (err) {
        // Log any errors that occur during login
        console.error("❌ Login error:", err);
      }
    },
    onError: (error) => console.error("Login failed:", error),
    // Requested permissions for Google OAuth login
    scope: [
      "https://www.googleapis.com/auth/calendar.events", // Read access to Google Calendar
      "https://www.googleapis.com/auth/userinfo.profile", // Access to user's profile data
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
