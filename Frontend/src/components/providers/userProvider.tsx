import { useState, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import type { UserData } from '../../declarations/declarations.d';

// Provides access to user data and auth state via context
export const UserProvider = ({ children }: any) => {

    // userData holds info about loggedIn userData, or null if no one is logged in
    const [userData, setUserData] = useState<UserData | null> (() => {
        // Checks localStorage for user data
        const storedUser = localStorage.getItem("frienDateUser");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Boolean flag for authentication state
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        // Initialize based on localStorage flag
        return localStorage.getItem("isLoggedIn") === "true";
    });

    // Set up even listeners on mount for login/logout
    useEffect(() => {
        const handleLogin = () => {
            // On login, load user data from localStorage and update state
            const storedUser = localStorage.getItem("frienDateUser");
            if(storedUser) {
                setUserData(JSON.parse(storedUser));
                setIsLoggedIn(true);
            }
        };

        const handleLogout = () => {
            // On logout, clear state
            setUserData(null);
            setIsLoggedIn(false);
        };

        // Add listeners for custom login/logout events
        window.addEventListener("userLogin", handleLogin);
        window.addEventListener("userLogout", handleLogout);

        // Clean up listeners on unmount
        return () => {
            window.removeEventListener("userLogin", handleLogin)
            window.removeEventListener("userLogout", handleLogout);
        }
    }, []);

    return(
        // UserContext.Provider gives child components access to context values
        <UserContext.Provider value={{ userData, setUserData, isLoggedIn, setIsLoggedIn}}>
            {children}
        </UserContext.Provider>
    );
};