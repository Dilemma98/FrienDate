import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';

interface UserData {
  name: string;
  email: string;
  picture: string;
  given_name: string;
  family_name: string;
}

interface GoogleLoginButtonProps {
  setUserData: (user: UserData | null) => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ setUserData }) => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      })
        .then((res) => res.json())
        .then((userInfo: UserData) => {
          setUserData(userInfo);
          localStorage.setItem("frienDateUser", JSON.stringify(userInfo));
          localStorage.setItem("isLoggedIn", "true");          window.dispatchEvent(new Event("userLogin"));
        })
        .catch((err) => console.error("Error fetching user data:", err));
    },
    onError: () => console.log("Inloggning misslyckades"),
  });

  return (
    <button
      onClick={() => login()}
      className="px-6 py-3 text-lg bg-gradient-to-b from-[#bd7d8d] to-[#a05e6e] text-white font-bold rounded-full shadow-md transition-transform transform hover:scale-110 hover:bg-[#8f5060] flex items-center justify-center gap-3"
    >
      Logga in med Google
      <FcGoogle className="text-2xl bg-white rounded-full text" />
    </button>
  );
};

export default GoogleLoginButton;