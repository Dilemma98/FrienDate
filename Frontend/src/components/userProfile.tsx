import { UserData } from "../declarations";

export interface userProfileProps {
    userData: UserData | null; 
}
const UserProfile = ({userData}: userProfileProps) => {
    if(!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="text-center mb-20 mt-10">
            <div className="max-w-4xl mx-auto p-8">
                <h1 className="text-4xl font-bold text-[#562f39] mb-6 drop-shadow-md">
                    Välkommen {userData.given_name}!
                </h1>
                <img
                    src={userData.picture}
                    alt="Profilbild"
                    className="rounded-full w-20 h-20 mb-4" />
                <p className="text-xl text-[#562f39] mb-5"></p>
            </div>
        </div>
    )
}

export default UserProfile;