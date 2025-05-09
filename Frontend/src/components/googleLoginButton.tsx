import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import UserProfile from './userProfile'; // eller rätt sökväg om den är i en annan mapp

const GoogleLoginButton = () => {
  const [userData, setUserData] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      // Send token to backend or handle it as needed
      fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      })
        .then((response) => response.json())
        .then((userInfo) => {
          setUserData(userInfo);
          console.log("Inloggad!", userInfo.name);
          // Dispatch a custom event to notify other parts of the app
          // that the user has logged in
          window.dispatchEvent(new Event("userLogin"));
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    },
    onError: () => {
      console.log("Inloggning misslyckades");
    },
  });

  return (
    <div>
      {!userData ? (
        <button
          onClick={() => login()}
          className="px-6 py-3 text-lg bg-gradient-to-b from-[#bd7d8d] to-[#a05e6e] text-white font-bold rounded-full shadow-md transition-transform transform hover:scale-110 hover:bg-[#8f5060] flex items-center justify-center gap-3"
        >
          Logga in med Google
          <FcGoogle className="text-2xl bg-white rounded-full text" />
        </button>
      ) : (
        <UserProfile userData={userData} />
      )}
    </div>
  );
};

export default GoogleLoginButton;