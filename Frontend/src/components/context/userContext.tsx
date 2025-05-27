import { createContext, useContext } from "react";
import type { UserData } from "../../declarations/declarations.d";

// Type definition for the shape of the user context
// This includes the user data, login state, and functions to update both
type UserContextType = {
    userData: UserData | null;
    isLoggedIn: boolean;
    setUserData: (data: UserData | null) => void;
    setIsLoggedIn: (val: boolean) => void;
};

// Create the UserContext with an undefined default (enforcing it in hook below)
export const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook to consume the UserContext easily in components
export const useUser = () => {
    const context = useContext(UserContext);
    
    // If used outside the provider, throw an error to help with debugging
    if(!context) {
        throw new Error("useUser must be used within a userProvider");
    }
    return context;
};