import Calendar from "../calendar/calendar";
import { UserData } from "../../declarations/declarations";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../other/errorBoundary";
import { useUser } from "../context/userContext";
import UserMenu from "./userMenu";

export interface UserProps {
  userData: UserData | null;
}

const UserDashboard = () => {
  const { userData } = useUser();

  if (!userData) {
    return (
      <div className="text-center mt-20 text-lg text-red-600">
        Du måste logga in för att se din dashboard.
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4 px-0 mt-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        <UserMenu />

        {/* Kalenderkort */}
        <div className="flex-1 bg-white shadow-md rounded-2xl p-4 mb-10">
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
