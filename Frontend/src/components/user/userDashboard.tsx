import React from "react";
import Calendar from "../calendar/calendar"; // Import the Calendar component if you want to use it later
import { UserData } from "../../declarations/declarations"; // Import UserData type from declarations
import { ErrorBoundary } from "react-error-boundary"; // Import ErrorBoundary for error handling
import ErrorFallback from "../../errorBoundary"; // Import the ErrorFallback component for error handling

// Define the UserProps interface for this component's props
export interface UserProps {
  userData: UserData | null; // userData can either be a UserData object or null
}

// UserDashboard component
const UserDashboard: React.FC<UserProps> = ({ userData }) => {
  // If userData is null (user is not logged in), display a login message
  if (!userData) {
    return <div>Du måste logga in för att se din dashboard.</div>; // Message in Swedish saying "You must log in to see your dashboard"
  }

  return (
    <div className="text-center mb-20 mt-2">
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex items-center justify-center gap-4">
          <h1 className="text-3xl font-bold text-[#562f39] drop-shadow-md mb-0">
            Välkommen {userData.givenName}!
          </h1>
          <img
            src={userData.picture}
            alt="Profilbild"
            className="rounded-full w-10 h-10"
          />
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-[#562f39]">
            Din personliga kalender </h2>
            <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => window.location.reload()}
          >
            <Calendar />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
