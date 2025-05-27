import React, { useEffect } from "react";
import { UserData } from "../../declarations/declarations"; // Import UserData type from declarations

// UserProfile component accepts userData prop which can be either a UserData object or null
const UserProfile: React.FC<{ userData: UserData | null }> = ({ userData }) => {
  // useEffect hook to fetch user information from the backend after component mounts
  useEffect(() => {
    // Async function to fetch user info from the backend API
    const fetchUserInfo = async () => {
      // Retrieve the access token from localStorage
      const accessToken = localStorage.getItem("accessToken");
      // If there's no access token, exit early
      if (!accessToken) return;

      try {
        // Make a GET request to fetch user info from the backend API
        const res = await fetch(
          "http://localhost:5231/api/google/fetchUserInfo",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`, // Send the access token in the Authorization header
            },
          }
        );

        // If the response isn't ok (status code is not 200), log an error
        if (!res.ok) {
          console.error("Fel vid hämtning av användarinfo från backend");
          return;
        }
      } catch (error) {
        // If there is an error during the fetch operation, log the error
        console.error("Fel vid hämtning av användarinformation:", error);
      }
    };

    // Call the fetchUserInfo function when the component mounts
    fetchUserInfo();
    // Empty dependency array means this effect runs only once (on component mount)
  }, []);

  if (!userData) {
    return <div>Ingen användardata tillgänglig.</div>;
  }

  return (
    <div className="text-center w-4/5 max-w-2xl mx-auto my-12 p-6 bg-white rounded-lg shadow-xl mt-4 mb-15">
      <h1 className="text-3xl font-bold text-[#562f39] drop-shadow-md mb-4">
        Användarprofil 👤
      </h1>
      <div className="flex flex-col items-center gap-4">
        <img
          src={userData.picture}
          alt="Profilbild"
          className="rounded-full w-20 h-20"
        />
        <div className="text-start ml-7">
          <p>
            <b>Förnamn: </b>
            <span className="ml-9">{userData.givenName}</span>
          </p>
          <p>
            <b>Efternamn: </b>
            <span className="ml-6">{userData.familyName}</span>
          </p>
          <p>
            <b>E-post: </b>
            <span className="ml-14">{userData.email}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
