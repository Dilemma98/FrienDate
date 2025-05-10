
export interface userProfileProps {
    userData: {
        name: string;
        email: string;
        picture: string;
        given_name: string;
        family_name: string;
    }
}
const UserProfile: React.FC<userProfileProps> = ({userData}: userProfileProps) => {
    if(!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="text-center mb-20 mt-10">
          <div className="max-w-4xl mx-auto p-8">
            <div className="flex items-center justify-center gap-4">
              <h1 className="text-3xl font-bold text-[#562f39] drop-shadow-md mb-0">
                Välkommen {userData.given_name}!
              </h1>
              <img
                src={userData.picture}
                alt="Profilbild"
                className="rounded-full w-10 h-10"
              />
            </div>
            <div className="mt-4">
              <p>Dina planer</p>
            </div>
          </div>
        </div>
      );      
}

export default UserProfile;