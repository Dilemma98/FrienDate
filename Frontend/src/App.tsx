import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "./components/other/contactUs";
import Footer from "./components/other/footer";
import AboutUs from "./components/other/aboutUs";
import HowItWorks from "./components/other/howItWorks";
import NotFound from "./components/other/notFound";
import Header from "./components/other/header";
import HomePage from "./components/other/home";
import NavBar from "./components/other/nav-bar";
import GoogleLoginButton from "./components/login/googleLoginButton";
import { GoogleOAuthProvider } from "@react-oauth/google";
import UserDashboard from "./components/user/userDashboard";
import UserProfile from "./components/user/userProfile";
import ActivitySuggestions from "./components/activitySuggestions/activitySuggestions";
import GroupPage from "./components/other/groupPage";
import { UserProvider } from "./components/providers/userProvider";
import "./style.css";

const App: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <UserProvider>
        <Router>
          <div>
            <Header />
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/contactUs" element={<Contact />} />
              <Route path="/aboutUs" element={<AboutUs />} />
              <Route path="/howItWorks" element={<HowItWorks />} />
              <Route path="/googleLogin" element={<GoogleLoginButton />} />
              <Route path="/userDashboard" element={<UserDashboard />} />
              <Route path="/userProfile" element={<UserProfile />} />
              <Route path="/activitySuggestions" element={<ActivitySuggestions />} />
              <Route path="/groupPage" element={<GroupPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </UserProvider>
    </GoogleOAuthProvider>
  );
};

export default App;